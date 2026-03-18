import express, { Express } from "express";
import bgRemoverRouter from "./routes/background-remover.route";

const app: Express = express();

app.use(express.json({ limit: '10mb' })); // To handle large base64 image data

app.use('/api', bgRemoverRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

(global as any).__SERVER__ = app; // Store server reference for teardown

export default app;