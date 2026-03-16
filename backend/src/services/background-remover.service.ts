import BRRepository from '../repositories/background-remover.repository';

import axios from 'axios';

class BRService {
    brRepository: BRRepository;

    constructor(brRepository: BRRepository) {
        this.brRepository = brRepository;
    }

    async doRemoveBackground(data: { imageData: Buffer, ip: string }): Promise<{ message: string, taskId: string }> {
        const { imageData, ip } = data;

        const response = await axios.post('https://api.upsampler.com/v1/process', {
            input: { image: imageData },
            webhook: "https://your-domain.com/api/webhooks/upsampler", // Your listener
            webhook_events_filter: ["completed"], // Only notify when done
            // Custom metadata to identify the user/job later
            metadata: { userId: ip, jobId: ip }
        }, {
            headers: { 'Authorization': `Bearer ${process.env.UPSAMPLER_KEY}` }
        });

        // Return 202 Accepted (standard for async tasks)
        return { message: "Processing started", taskId: response.data.id };
    }
}

export default BRService;