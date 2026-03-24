import { brController } from '../csr-setup';

import { Router } from 'express';
import fs from 'node:fs';

const bgRemoverRouter = Router();

bgRemoverRouter.post('/request-bg-removal', async (req, res, next) => {
  try {
    const imageData = (req.files as any); // Assuming the file field is named 'image'
    const userIp = req.ip; // Get user IP for logging/metadata

    console.log("Image data received, starting background removal task...", imageData.image.tempFilePath, "from IP:", userIp);

    const response = await brController.postRequiredData({ imagePath: imageData.image.tempFilePath, ip: userIp || "" }); // Call controller method

    console.log("Download path: ", response);

    res.status(200).json({ success: true, imagePath: response.imagePath });

    // Optionally delete the temporary file after sending
    // fs.unlink(response.imagePath, (unlinkErr) => {
    //   if (unlinkErr) console.log("Error deleting temp file:", unlinkErr);
    //   else console.log("Temp file deleted successfully");
    // });
  } catch (error) {
    console.log("Error in /request-bg-removal route:", error);
    res.status(500).json({ error: "Failed to queue task" });
    next(error);
  }
});

export default bgRemoverRouter;