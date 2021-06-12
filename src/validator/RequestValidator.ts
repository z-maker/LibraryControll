import express, { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import HttpStatus from "http-status";
import { ApiResponse } from "../types";

export const body_validator = (req: Request, res: Response, next: NextFunction) => {
  
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const response: ApiResponse = {
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      result: undefined,
      errors: errors.array(),
    };
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(response);
  }
};
