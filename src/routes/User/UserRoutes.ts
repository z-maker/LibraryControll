import express from 'express'
import { check, body } from 'express-validator'
const router = express.Router()

import * as Controller from "../../controllers/User/UserController"

router.get("/user",Controller.get)

router.post("/user",Controller.post)

export default router