import pa11y from "pa11y";
import axios from "axios";
import { parseString } from 'xml2js';
import { EventEmitter } from 'events';

const myEmitter = new EventEmitter();
myEmitter.setMaxListeners(20);

const sitemapUrl = 'https://developers.cloudflare.com/sitemap.xml';

async function processUrlBatch(urls) {
    const promises = urls.map(async (url) => {
        try {
            const results = await pa11y(url);
            console.log(results);
        } catch (error) {
            console.log("error");
        }
    });

    await Promise.all(promises);
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
                processUrlBatch(urls);
            });
        } else {
            console.error('Failed to fetch sitemap. Status code:', response.status);
        }
    })
    .catch(error => {
        console.error('An error occurred:', error);
    });
