import BRService from "../services/background-remover.service";

interface IRequiredData {
    imageData: Buffer;
    ip: string;
}

class BRController {
    constructor(private brService: BRService) {
        this.brService = brService;
    }

    async postRequiredData(data: {imageData: string, ip: string}): Promise<{ message: string, transparentImage: string }> {

        return this.brService.doRemoveBackground(data);
        
    }
}

const brController = new BRController(BRService.prototype);

export { brController };
export default BRController;