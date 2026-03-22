import fileUpload from 'express-fileupload';
import cors from 'cors';

import express, { Express } from "express";
import bgRemoverRouter from "./routes/background-remover.route";

import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();

app.use(cors({
    origin: 'https://background-remover-six-iota.vercel.app/', // Adjust this to your frontend URL
    preflightContinue: true,
    optionsSuccessStatus: 200,
}));

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: '/tmp/',
    safeFileNames: true,
    preserveExtension: true
}));

app.use(express.json({ limit: '10mb' })); // To handle large base64 image data

app.get('/', (req, res) => {
    res.send('Hello World from Kazeem\'s SAAS!. This is the backend server for the Background Image Remover application.');
});

app.use('/api', bgRemoverRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

(global as any).__SERVER__ = app; // Store server reference for teardown

export default app;