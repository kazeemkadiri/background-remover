import BRService from "../services/background-remover.service";

interface IRequiredData {
    imageData: Buffer;
    ip: string;
}

class BRController {
    constructor(private brService: BRService) {
        this.brService = brService;
    }

    async getRequiredData(data: {imageData: Buffer, ip: string}): Promise<void> {

        this.brService.doRemoveBackground(data);
    }
}

export default BRController;