import { Router } from "express";
import { setUpFeeConfigurationJson, computeFeeJson } from "./fees_controller";

const router = Router();

/**
 * to set up fees
 * /fees - POST
 */
router.post("/fees", setUpFeeConfigurationJson);

/**
 * fee computation endpoint
 * /compute-transaction-fee - POST
 */
router.post("/compute-transaction-fee", computeFeeJson);

export default router;
