import { brController } from '../csr-setup'; 

import { Router } from 'express';

const bgRemoverRouter = Router();

bgRemoverRouter.post('/request-bg-removal', async (req, res) => {
  try {
    const { imageData } = req.body;
    const userIp = req.ip; // Get user IP for logging/metadata

    brController.getRequiredData({imageData, ip: userIp || ""}); // Call controller method

  } catch (error) {
    res.status(500).json({ error: "Failed to queue task" });
  }
});

export default bgRemoverRouter;