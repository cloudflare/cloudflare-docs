import pa11y from "pa11y"
import core from "@actions/core";
import axios from "axios"
import { parseString } from 'xml2js';

const sitemapUrl = 'https://developers.cloudflare.com/sitemap.xml';

function processUrl(url) {
    pa11y(url).then((results) => {
    console.log(results)
});
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
                urls.forEach(processUrl);
            });
        } else {
            console.error('Failed to fetch sitemap. Status code:', response.status);
        }
    })
    .catch(error => {
        console.error('An error occurred:', error);
    });
