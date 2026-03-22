import BRRepository from "../repositories/background-remover.repository";
import BRService from "../services/background-remover.service";
import BRController, { brController } from "./background-remover.controller";


jest.mock('../services/background-remover.service');
jest.mock('../repositories/background-remover.repository');

describe('BRController', () => {
    let brController: BRController;
    let brServiceMock: any;
    let brRepositoryMock: any;

    beforeEach(() => {
        brRepositoryMock = new BRRepository();
        brServiceMock = new BRService(brRepositoryMock);
        brController = new BRController(brServiceMock);
    });

    it('should call getRequiredData and return the expected result', async () => {
        const mockResponse = { message: "Processing started", transparentImage: "54321" };

        jest.spyOn(brController, 'postRequiredData').mockResolvedValue(mockResponse);

        const result = await brController.postRequiredData({ imageData: 'test', ip: '127.0.0.1' });
        expect(result).toEqual(mockResponse);
    });
});