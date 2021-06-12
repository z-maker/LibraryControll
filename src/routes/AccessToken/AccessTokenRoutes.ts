import express from 'express'
import { check, body } from 'express-validator'
const router = express.Router()

import * as Controller from "../../controllers/AccessToken/AccessTokenController"

router.get("/tokens",Controller.get)

export default router