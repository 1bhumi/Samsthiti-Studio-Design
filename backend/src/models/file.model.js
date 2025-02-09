import mongoose, { Schema } from "mongoose";

const fileSchema = new Schema(
    {
        fileName: {
            type: String,
            required: true,
        },
        file: {
            type: String, // Cloudinary path
            required: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId, // Reference to admin
            ref: "Admin",
        },
    },
    { timestamps: true }
);

const File = mongoose.model("File", fileSchema);

export default File;
