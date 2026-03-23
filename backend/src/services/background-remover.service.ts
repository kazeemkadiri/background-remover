import BRRepository from '../repositories/background-remover.repository';

import { RemoveBgResult, RemoveBgError, removeBackgroundFromImageFile } from "remove.bg";

import fs from 'node:fs';
import path from 'node:path';
import { cwd } from 'node:process';

class BRService {
    brRepository: BRRepository;

    constructor(brRepository: BRRepository) {
        this.brRepository = brRepository;
    }

    doRemoveBackground = async ({ imagePath, ip }: { imagePath: string, ip: string }): Promise<{ message: string, taskId: string, imagePath: string }> => {

        const outputFile = path.join(cwd(), `/dist/out/output-image.png`);

        await removeBackgroundFromImageFile({
            path: imagePath,
            apiKey: process.env.REMOVE_BG_API_KEY!,
            size: "full",
            type: "auto",
            scale: "0%",
            outputFile
        }).then((result: RemoveBgResult) => {
            console.log(`File saved to ${outputFile}`);
        }).catch((errors: Array<RemoveBgError>) => {
            console.log(JSON.stringify(errors));
        });

        return { message: "Processing started", taskId: "12345", imagePath: '/out/output-image.png' };
    };
}

export default BRService;