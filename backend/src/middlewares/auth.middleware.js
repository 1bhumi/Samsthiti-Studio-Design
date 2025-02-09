import AsyncHandler from "../utils/AsyncHandler.js";
import HandleError from "../utils/HandleError.js";
import Admin from "../models/admin.model.js";
import JWT from "jsonwebtoken"

const Auth = AsyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.access_Token || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            return res
            .status(400)
            .json(
                new HandleError(400, "Token is expired! or missing!")
            )
        }

        const decodedToken = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await Admin.findById(decodedToken._id).select("-password")

        if (!user) {
            return res
            .status(404)
            .json(
                new HandleError(404, "User not found!")
            )
        }

        req.user = user
        next()
    } catch (error) {
        return res
        .status(400)
        .json(
            new HandleError(400, error?.message)
        )
    }
})

export default Auth