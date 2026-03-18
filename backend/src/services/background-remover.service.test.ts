import BRRepository from "../repositories/background-remover.repository";
import BRService from "./background-remover.service";

jest.mock("../repositories/background-remover.repository");

describe("BRService", () => {
    
    it("should call the API and return task ID", async () => {
        // Mock the repository and axios
        const mockRepository = new BRRepository();
        const service = new BRService(mockRepository);

        // Mock axios post response
        const mockResponse = { data: { id: "12345" } };
        jest.spyOn(require('axios'), 'post').mockResolvedValue(mockResponse);

        const result = await service.doRemoveBackground({ imageData: Buffer.from("test"), ip: "192.168.1.1" });

        expect(result).toStrictEqual({"message": "Processing started", "taskId": "12345"});

    });
});