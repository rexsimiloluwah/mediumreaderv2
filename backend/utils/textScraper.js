import axios from 'axios';
import cheerio from 'cheerio';
import urlExists from 'url-exists';

/**
 * @param {String}
 * URL for the website to be scraped
 */
export const scrapeText = (url) => {
    return new Promise((resolve,reject) => {
        urlExists(url, function(err, exists){
            console.log(exists)
            if(!exists){
                reject({message: "URL is invalid", status: 400});
            }

            if(err){
                reject({message: err, status: 500});
            }
        })

        axios.get(url).then(async response => {
            const {data} = response;
            const selector = await cheerio.load(data);
            const text = selector("body").find("p").text();
            resolve({data: text});
        })
        .catch(error => {
            reject({message: error.message, status: 500});
        })
    })
}

