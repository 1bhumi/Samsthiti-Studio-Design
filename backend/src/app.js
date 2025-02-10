import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(express.json({ limit: "100kb" }))
app.use(express.urlencoded({ limit: "100kb", extended: true }))
app.use(express.static("public/temp"))

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true
}))

app.use(cookieParser())

//router
import adminRouter from "./routes/admin.route.js"
import fileRouter from "./routes/file.route.js"

app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/file", fileRouter)

export default app