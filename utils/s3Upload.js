import multer from 'multer';
import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

/* LOCAL STORAGE MULTER CONFIGURATION */
const multerStorage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, path.resolve('public','uploads'));
    },

    filename: function(req,file,cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const s3Client = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

export const s3Upload = (filepath) => {
    return new Promise((resolve,reject) => {
        const fileContent = fs.readFileSync(filepath);
        const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: 'posts/' + Date.now() + ".mp3",
            Body: fileContent,
            ACL: 'public-read',
            ContentType: "audio/mpeg",
        }

        s3Client.upload(params, (err,data) => {
            if(err){
                console.log(err);
                reject({error : "An error occurred while uploading this file."})
            }

            // Delete the temporary file stored in local storage
            fs.unlinkSync(filepath);
            resolve({location : data.Location})
        })
    })
}

export const multerStorageUpload = multer({ storage : multerStorage });

