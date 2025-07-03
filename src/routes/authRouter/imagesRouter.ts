import express from "express";
import images from "../../controllers/authController/authImages"

const router = express.Router();

router.get("/images", images);

export default router;