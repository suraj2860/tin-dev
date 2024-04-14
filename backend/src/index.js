import dotenv from 'dotenv';
import connectDB from './db/index.js';
import { server } from './app.js';

dotenv.config({
    path: './env'
});

const port = process.env.PORT || 8000;

connectDB()
.then(() => {
    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
})
.catch((error) => {
    console.log("MONGODB connection failed :: ",error);
})