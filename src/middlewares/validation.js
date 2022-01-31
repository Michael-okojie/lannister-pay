import { validationResult } from "express-validator";
import { CustomError } from "../utils/customError";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const errorsArray = [];
  const err = errors.array()[0].msg;
  errors.array().map((error) => errorsArray.push({ [error.param]: error.msg }));

  return next(new CustomError(422, err));
};
