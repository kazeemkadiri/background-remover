import BRRepository from '../repositories/background-remover.repository';

import { removeBackground, Config } from "@imgly/background-removal-node";

class BRService {
    brRepository: BRRepository;

    constructor(brRepository: BRRepository) {
        this.brRepository = brRepository;
    }

    async doRemoveBackground(data: { imageData: any, ip: string }): Promise<{ message: string, transparentImage: string }> {
        const { imageData, ip } = data;

        try {
            console.log(`Starting background removal...`);

            // Configuration options
            const config: any = {
                model: 'medium', // 'small' (~40MB) or 'medium' (~80MB)
                output: {
                    format: 'image/png', // Must be PNG for transparency
                    quality: 0.8,
                    type: 'foreground' // 'foreground', 'background', or 'mask'
                },
                // Optional: Track download progress on first run
                progress: (key: any, current: number, total: number) => {
                    const percent = Math.round((current / total) * 100);
                    console.log(`Downloading AI Assets [${key}]: ${percent}%`);
                }
            };

            // The core function: Accept path, buffer, or URL
            const resultBlob = await removeBackground(imageData as any, config);

            // Convert the resulting Blob to a Node.js Buffer
            const arrayBuffer = await resultBlob.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            // Save to local disk
            // fs.writeFileSync(outputPath, buffer);

            console.log(`✅ Success! Transparent image saved`);

            return { message: "Background removal completed", transparentImage: buffer.toString('base64') };
        } catch (error) {
            console.error('❌ Error during processing:', error);

            return { message: "Background removal completed", transparentImage: '' };
        }

    }
}

export default BRService;