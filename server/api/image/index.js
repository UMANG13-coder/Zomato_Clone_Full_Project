import express from 'express';
// import AWS from 'aws-sdk';
import multer from 'multer';

import { ImageModel } from '../../database/allModules'

import { s3Upload } from '../../utils/s3'

const Router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * Route     /:_id
 * Des       Get image details
 * Params    _id
 * Access    Public
 * Method    GET
 */
Router.get('/:_id', async (req, res) => {
    try {
        const image = await ImageModel.findById(req.params._id);

        return res.status(200).json({ image });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

/**
 * Route     /
 * Des       Upload Image to s3 bucket and save file link to mongoDB
 * Params    _id
 * Access    Public
 * Method    POST
 */
Router.post('/', upload.single("file"), async (req, res) => {
    try {
        const file = req.file;

        const bucketOptions = {
            Bucket: "zomato-clone-full-project",
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: "public-read",
        }

        const uploadImage = await s3Upload(bucketOptions);

        const dbUpload = await ImageModel.create({
            images: [{
                location: uploadImage.location,
            },]
        });

        return res.status(200).json({ dbUpload });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
})

export default Router;