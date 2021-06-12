import express from "express";

//Middleware validations
import { check, body } from "express-validator";
import { body_validator } from "../../validator/RequestValidator";

import * as Controller from "../../controllers/Application/ApplicationController";

const router = express.Router();

router.get("/application", Controller.get);

router.get("/application/:id", Controller.getById);

router.post(
  "/application",
  [body("name").notEmpty(), body_validator],
  Controller.post
);

router.put(
  "/application",
  [body("name").notEmpty(),body("id").notEmpty().isInt(), body_validator],
  Controller.put
);

router.delete("/application/:id",Controller.remove)

export default router;
