import request from 'supertest';
import app from '../app'; // Assuming your Express app is exported from index.ts

import {brController} from '../controllers/background-remover.controller';

jest.mock('../controllers/background-remover.controller');

describe("POST /request-bg-removal", () => {
    afterAll(async () => {
        jest.clearAllMocks();
    });

    it("should return 200 and a task id", async () => {
        jest.spyOn(brController, 'postRequiredData').mockResolvedValue({ message: "Processing started", transparentImage: "54321" });

        const response = await request(app)
            .post('/api/request-bg-removal')
            .send({"imageData": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA"}); // Sample base64 image data

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('taskId');
    });
});