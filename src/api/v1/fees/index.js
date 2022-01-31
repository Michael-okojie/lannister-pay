import { Router } from "express";
// import validations from "./fees_validation";
// import { validate } from "../../../middlewares/validation";
// import { signUpForWaitlist } from "./fees_controller";

const router = Router();

/**
 * to set up fees
 * /fees - POST
 */
router.post(
  "/fees",
//   validations.signUpWaitlistRule(),
//   validate,
//   signUpForWaitlist
);

export default router;
