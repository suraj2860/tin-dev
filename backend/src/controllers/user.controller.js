import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";


const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const user = await User.findOne(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Error occured while generating access and refresh tokens");
    }
}

const registerUser = asyncHandler(async (req, res) => {
    // fething values from request body
    const { username, email, fullName, password, bio, state = '', country, skills, github = '', linkedin = '', twitter = '', youtube = '', otherLink = '' } = req.body

    // validation: all fields are required
    if (
        [username, email, fullName, password, bio, country, skills].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }

    // checking if user already exists. If exists, throw error
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }

    // check for avatar
    const avatarLocalPath = req.files?.avatar ? req.files?.avatar[0]?.path : null;
    let avatar;
    if (!avatarLocalPath) {
        avatar = {
            url: "https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"
        }
    }
    else{
        // upload avatar and coverImage on cloudinary
        avatar = await uploadOnCloudinary(avatarLocalPath);
    }
    
    if (!avatar) {
        throw new ApiError(400, "Avatar file is required");
    }

    // upload user in database
    const user = await User.create({
        username: username.toLowerCase(),
        email,
        password,
        fullName,
        avatar: avatar.url,
        bio,
        state,
        country,
        skills: skills.split(',').map(skill => skill.trim()),
        github,
        linkedin,
        twitter,
        youtube,
        otherLink
    })

    // Checking if the user is successfully uploaded on database. 
    // If true, then creating a user response object and removing the password and refreshToken from it. Else, return server error.
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    );
});

const loginUser = asyncHandler(async (req, res) => {

    // fetch data from request
    const { username, email, password } = req.body;

    // validation : username or email is required
    if (!username && !email) {
        throw new ApiError(400, "Username or Email is required");
    }

    if (!password) {
        throw new ApiError(400, "Password is required");
    }

    // get the user from database
    const user = await User.findOne({
        $or: [{ username }, { email }]
    });

    // if user does not exist, throw error
    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    // if user exist, then validate his/her password.
    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    // generating access and refresh tokens
    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id);

    // removing password and refreshToken from response
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    // returning response and storing accessToken & refreshToken in cookies

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken
                },
                "User logged in successfully"
            )
        );
});

const logoutUser = asyncHandler(async (req, res) => {

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    );

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(
                200,
                {},
                "User logged out successfully"
            )
        );
});

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find();

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                users,
                "users fetched successfully"
            )
        )
});

const updateProfile = asyncHandler(async (req, res) => {

    const { username, email, fullName, bio, state, country, skills, github, linkedin, twitter, youtube, otherLink } = req.body;

    if (!fullName && !email && !username && !bio && !state && !country && !skills && !github && !linkedin && !twitter && !youtube && !otherLink) {
        throw new ApiError(400, "atleast one field is required to update profile");
    }

    const updateFields = {};

    // Conditionally add fields to updateFields if they are provided
    if (username) updateFields.username = username.toLowerCase();
    if (email) updateFields.email = email;
    if (fullName) updateFields.fullName = fullName;
    if (bio) updateFields.bio = bio;
    if (state) updateFields.state = state;
    if (country) updateFields.country = country;
    if (skills) updateFields.skills = skills.split(',').map(skill => skill.trim());
    if (github) updateFields.github = github;
    if (linkedin) updateFields.linkedin = linkedin;
    if (twitter) updateFields.twitter = twitter;
    if (youtube) updateFields.youtube = youtube;
    if (otherLink) updateFields.otherLink = otherLink;

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        { $set: updateFields },
        { new: true, select: '-password' }
    );

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {user: user},
                "Profile updated successfully"
            )
        );
});

const updateUserAvatar = asyncHandler(async (req, res) => {

    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is missing");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar.url) {
        throw new ApiError(400, "Error occured while uploading user avatar on Cloudinary");
    }

    const oldUserAvatar = await User.findById(req.user?._id).select("avatar");
    const oldAvatarPublicId = oldUserAvatar.avatar.split('/').pop().split('.').slice(0, -1).join('.');

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: avatar.url
            }
        },
        {
            new: true
        }
    ).select("-password -refreshToken");

    if (user) {
        await deleteFromCloudinary(oldAvatarPublicId, "image");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    user: user
                },
                "Avatar updated successfully"
            )
        );
});

const refreshAccessToken = asyncHandler(async (req, res) => {

    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decodedToken._id);

        if (!user) {
            throw new ApiError(401, "Invalid refresh token");
        }

        if (incomingRefreshToken !== user.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used");
        }

        const options = {
            httpOnly: true,
            secure: true
        };

        const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id);

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        accessToken,
                        refreshToken: refreshToken
                    },
                    "Access token refreshed"
                )
            );

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token");
    }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        throw new ApiError(401, "All fields are required");
    }

    const user = await User.findById(req.user?._id);

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid old password");
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Password changed successfully"
            )
        );
});

const getCurrentUser = asyncHandler(async (req, res) => {

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {user : await req.user},
                "Current fetched successfuly"
            )
        );
});

export { 
    registerUser, 
    getAllUsers, 
    updateProfile, 
    loginUser, 
    updateUserAvatar, 
    logoutUser, 
    refreshAccessToken, 
    changeCurrentPassword,
    getCurrentUser
 };