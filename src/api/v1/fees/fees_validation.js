import { body } from "express-validator";

const signUpWaitlistRule = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .trim()
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      .withMessage("Enter a valid email address"),
    body("full_name").notEmpty().withMessage("Full name is required").trim(),
    body("waitlist_type")
      .notEmpty()
      .withMessage("Waitlist type is required")
      .isIn(["investor", "asset_lister"])
      .withMessage("Invalid waitlist type"),
    body("asset_description")
      .if(body("waitlist_type").exists().equals("asset_lister"))
      .notEmpty()
      .withMessage("Asset description is required")
      .isLength({ min: 12 })
      .withMessage("Enter a detailed description of the asset to be listed"),
  ];
};

export default {
  signUpWaitlistRule,
};