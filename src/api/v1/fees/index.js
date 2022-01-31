import { Router } from "express";
import { setUpFeeConfiguration, computeFee } from "./fees_controller";

const router = Router();

/**
 * to set up fees
 * /fees - POST
 */
router.post("/fees", setUpFeeConfiguration);

/**
 * fee computation endpoint
 * /compute-transaction-fee - POST
 */
router.post("/compute-transaction-fee", computeFee);

export default router;
