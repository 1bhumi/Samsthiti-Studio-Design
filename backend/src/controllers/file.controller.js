import AsyncHandler from "../utils/AsyncHandler.js";
import HandleResponse from "../utils/HandleResponse.js";
import HandleError from "../utils/HandleResponse.js";
import File from "../models/file.model.js";
import uploadOnCloudinary from "../utils/Cloudinary.js"

const uploadFile = AsyncHandler (async(req,res)=>{
    const  file = req.file;
    const {fileName} = req.body


    if(!fileName || fileName?.trim() === " "){
        return res
        .status(404)
        .json(
            new HandleError(404, "Please enter File Name!! ")
        )
    }
    if(!file){
        return res
        .status(404)
        .json(
            new HandleError(404, "Please upload a file!!")
        )
    }

    const fileURL = await uploadOnCloudinary(file?.path)
    if(!fileURL){
        return res
        .status(404)
        .json(
            new HandleError(404, "Something went wrong while uploading file")
        )
    }

    const fileDocument = await File.create({
        fileName: fileName?.trim(),
        file: fileURL?.secure_url,
        owner: req.user_id
    })

    const checkFileDocument = await File.findOne(fileDocument._id)

    if(!checkFileDocument){
        return res
        .status(404)
        .json(
            new HandleError(404, "Error while uploading file. Try again!!")
        )
    }

    return res
    .status(200)
    .json(
        new HandleResponse(200, fileDocument, "Uploaded file successfully!!")
    )
})


const getFiles = AsyncHandler(async(req,res)=>{

    const files = await File.find()
    if(!files){
        return res
        .status(400)
        .json(
            new HandleError(400, "No file found")
        )
    }

    return res
    .status(200)
    .json(
        new HandleResponse(200, files, "Files found successfully!!")
    )
})

export {
    uploadFile,
    getFiles
}