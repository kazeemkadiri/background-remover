import { brController } from '../csr-setup'; 

import { Router } from 'express';

const bgRemoverRouter = Router();

bgRemoverRouter.post('/request-bg-removal', async (req, res, next) => {
  try {
    const { imageData } = req.body;
    const userIp = req.ip; // Get user IP for logging/metadata

    const response = await brController.getRequiredData({imageData, ip: userIp || ""}); // Call controller method

    res.status(200).json(response);
  } catch (error) {
    console.log("Error in /request-bg-removal route:", error);
    res.status(500).json({ error: "Failed to queue task" });
    next(error);
  }
});

export default bgRemoverRouter;