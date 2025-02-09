import {Router} from "express"
import { signup, login } from "../controllers/admin.controller.js"

const router = new Router()

router.route("/signup").post(signup)

router.route("/login").post(login)

export default router