import express, { Express } from "express";
import bgRemoverRouter from "./routes/background-remover.route";

class App {
    app: Express;

    constructor(app: Express) {
        this.app = app;

        this.setupRoutes();

        this.listen();
    }

    public setupRoutes() {
        // Import and use routes here
        this.app.use('/api', bgRemoverRouter);
    }

    public listen() {
        this.app.listen(3000, () => {
            console.log("Server running on port 3000");
        });
    }
}

new App(express());