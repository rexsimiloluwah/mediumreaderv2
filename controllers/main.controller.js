import path from 'path'
import HttpError from '../errors/HttpError';
import fs from 'fs';
import {BlogPost} from '../models';
import {s3Upload} from '../utils/s3Upload';
import gTTS from 'gtts';
import scrapeText from '../utils/scrapeText';

export default async function main(req,res,next){
    try{
        const response = await scrapeText(req.body.url);
        console.log(response);
        const lang = req.query.lang || "en";
        console.log(lang);

        // Truncating to only 1000 words, for performance bottlenecks (Sigh...)
        const text = response.data.split(" ").length > 5000 ? response.data.split(" ").slice(0, 1000).join(" ") : response.data
        console.log(text);
        /* Initialize Google Text-to-speech */
        let gtts = new gTTS(text, lang)
        let output = path.resolve('public','uploads', Date.now()+'.mp3');
        /* Synthesizing audio file from text */
        gtts.save(output, text, async function(err,result){
            if(err){
                return next(new HttpError(err, 500));
            }

            console.log("Successfully saved audio file.");
            // Uploading .mp3 file to S3 Bucket
            console.log(fs.readFileSync(output));
            const {location} = await s3Upload(output);

            if(result){
                // Saving document to MongoDB
                await BlogPost.create({
                    blogUrl : req.body.url,
                    audioFileUrl : location,
                    language : req.query.lang,
                    wordCount : response.data.length
                })
                .then(result => {
                    return res.status(200).json({
                        status: true,
                        data : result
                    })
                })
                .catch(error => {
                    console.error(error);
                    return next(new HttpError(error.message, 500));
                })
            }
            
        })
    }
    catch(error){
        console.error(error);
        return next(new HttpError(error.message, 500))
    }
}