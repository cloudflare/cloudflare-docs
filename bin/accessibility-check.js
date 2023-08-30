import pa11y from "pa11y";
import axios from "axios";
import { parseString } from 'xml2js';

process.on('warning', e => console.warn(e.stack));

const sitemapUrl = 'https://developers.cloudflare.com/sitemap.xml';
const urlsToProcess = []; // Array to store URLs for processing

async function processUrl(url) {
    try {
        const results = await pa11y(url);
        console.log(results);
    } catch (error) {
        console.log("error");
    }
}

axios.get(sitemapUrl)
    .then(response => {
        if (response.status === 200) {
            parseString(response.data, (err, result) => {
                if (err) {
                    console.error('Error parsing XML:', err);
                    return;
                }

                const urls = result.urlset.url.map(urlObj => urlObj.loc[0]);
                urlsToProcess.push(...urls); // Add individual URLs to the array
            });
        } else {
            console.error('Failed to fetch sitemap. Status code:', response.status);
        }
    })
    .catch(error => {
        console.error('An error occurred:', error);
    })
    .finally(() => {
        // Process the URLs after the response has been handled
        urlsToProcess.forEach(processUrl);
    });
