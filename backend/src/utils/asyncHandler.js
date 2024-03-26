const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch((error) => {
                res.status(error.statusCode || 500).json({
                    success: false,
                    error: error.message || 'Internal Server Error',
                    errors: error.errors || []
                });
                next(error);
            });
    }
}





export { asyncHandler };
