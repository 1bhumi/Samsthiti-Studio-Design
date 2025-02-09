import AsyncHandler from "../utils/AsyncHandler.js";
import HandleResponse from "../utils/HandleResponse.js";
import HandleError from "../utils/HandleResponse.js";
import Admin from "../models/admin.model.js";


// Admin Signup
const signup = AsyncHandler(async (req, res) => {

        const { username, email, password } = req.body;

        console.log(req.body);
        if (!username || !email || !password) {
            return res.status(400).json(new HandleError(400, "All field are required!!"))
        }

        if (!username?.trim()) {
            return res
                .status(400)
                .json(new HandleError(400, "Username cannot be empty!"));
        }
        if ( !/([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/.test(email?.trim().toLowerCase())) {
            return res
                .status(400)
                .json(new HandleError(400, "Email address is invalid!!"));
        }

        if (password?.trim().length < 8 || password?.trim().length > 16) {
            return res
                .status(400)
                .json(
                    new HandleError(400,"Password should be between 8 and 16 characters!!")
                );
        }
        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email, username });
        if (existingAdmin) {
            return res
            .status(400)
            .json(
                new HandleError(400, "Admin already exists" )
            )
        }

        // Create new admin
        const newAdmin = await Admin.create({ 
            username: username?.trim(), 
            email: email?.trim().toLowerCase(),
            password: password?.trim() 
        });

        const isAdminCreated = await Admin.findById(newAdmin._id).select("-password -refreshToken")

        if (!isAdminCreated) {
        return res.status(500).json(new ApiError(500, "Something went wrong while creating account!!"))
        }


        return res
            .status(200)
            .json(
                new HandleResponse(200, isAdminCreated, "Admin created successfully")
            );
});

// Admin Login
const login = AsyncHandler(async (req, res) => {
   
        const { email, password } = req.body;

        if (!email ||!password) {
            return res.status(400).json(new HandleError(400, "All fields are required!!"));
        }

        if (!/([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/.test(email?.trim().toLowerCase())) {
            return res
                .status(400)
                .json(new HandleError(400, "Email address is invalid!!"));
        }

        if (password?.trim().length < 8 || password?.trim().length > 16) {
            return res
                .status(400)
                .json(
                    new HandleError(400, "Password should be between 8 and 16 characters!!")
                );
        }

        // Check if admin exists
        const admin = await Admin.findOne({ email: email?.trim()?.toLowerCase() });
        if (!admin) {
            return res
            .status(400)
            .json(
                new HandleError(400, "Admin not found")
            );
        }

        // Compare passwords
        const checkPassword = await admin.comparePassword(password);
        if (!checkPassword) {
            return res
            .status(400)
            .json(
                new HandleError(400, "Invalid password")
            );
        }

        // Generate JWT token
        const accessToken = admin.generateAccessToken();
        const refreshToken = admin.generateRefreshToken();

        admin.refreshToken = refreshToken;
        await admin.save({ ValidateBeforeSave: false });

        const options = {
            httpOnly: true,
            secure: true,
        };

        return res
        .status(200)
        .cookie("access_Token", accessToken, options)
        .cookie("refresh_Token", refreshToken, options)
        .json(
            new HandleResponse(200, "Login sucessfully!!")
        );
});

export {
     signup,
     login 
    };
