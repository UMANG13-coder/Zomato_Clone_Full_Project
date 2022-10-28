import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const s3Bucket = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESSKEY,
    secretAccessKey: process.env.AWS_S3_SECRETKEY,
    region: "ap-south-1",
});

export const s3Upload = (options) => {
    return new Promise((resolve, reject) => s3Bucket.upload(options, (error, data) => {
        if (error) {
            return reject(error);
        }
        return resolve(data);
    })
    );
};