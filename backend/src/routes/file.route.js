import {Router} from "express"
import { uploadFile,getFiles } from "../controllers/file.controller.js"
import Auth from "../middlewares/auth.middleware.js"
import upload from "../middlewares/multer.middleware.js"

const router = new Router()

router.route("/get").get(getFiles) // no authentication for get files api 

router.use(Auth)

router.route("/upload").post(upload.single("file"),uploadFile)



export default router