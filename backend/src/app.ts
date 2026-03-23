import fileUpload from 'express-fileupload';
import cors from 'cors';

import express, { Express } from "express";
import bgRemoverRouter from "./routes/background-remover.route";

import dotenv from 'dotenv';
import path from 'node:path';
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

app.use(express.static(path.join(__dirname, 'build'))); // Serve static files from the 'build' directory

app.use('/out', express.static(path.join(__dirname, 'out'))); // Serve static files from the 'out' directory

app.get('*', (req, res) => {
    console.log('Received request for /', path.join(__dirname, 'build', 'index.html'));
    res.sendFile(path.join(__dirname, 'build', 'index.html')); // Serve the frontend application
    // res.end();
});

app.use('/api', bgRemoverRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

(global as any).__SERVER__ = app; // Store server reference for teardown

export default app;