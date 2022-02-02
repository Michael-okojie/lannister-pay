import { Router } from "express";
import { setUpFeeConfiguration, computeFee, setUpFeeConfigurationJson, computeFeeJson } from "./fees_controller";

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


// testing endpoint with fs module
router.post("/json-fees", setUpFeeConfigurationJson)

router.post("/json-compute-transaction-fee", computeFeeJson)

export default router;
