import BRRepository from "../repositories/background-remover.repository";
import BRService from "../services/background-remover.service";

interface IRequiredData {
    imageData: Buffer;
    ip: string;
}

class BRController {
    constructor(private brService: BRService) {
        this.brService = brService;
    }

    async postRequiredData(data: {imagePath: string, ip: string}): Promise<{ message: string, transparentImage?: string, imagePath: string }> {

        return this.brService.doRemoveBackground(data);
        
    }
}

const brController = new BRController(new BRService(new BRRepository()));

export { brController };
export default BRController;