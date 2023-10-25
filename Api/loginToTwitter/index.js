const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());


const loginToTwitter = async (username, password, tweet ) => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    try {
        await page.goto('https://twitter.com/');

        await page.waitForSelector('a[href="/login"]');
        await page.click('a[href="/login"]');

        await page.waitForSelector('input[name="text"]');
        await page.type('input[name="text"]', username);

        await page.click('div[class="css-901oao r-1awozwy r-6koalj r-18u37iz r-16y2uox r-37j5jr r-a023e6 r-b88u0q r-1777fci r-rjixqe r-bcqeeo r-q4m81j r-qvutc0"]');

        await page.waitForSelector('input[type="password"]');
        await page.type('input[type="text"]', password);

        await page.click('div[class="css-901oao r-1awozwy r-6koalj r-18u37iz r-16y2uox r-37j5jr r-a023e6 r-b88u0q r-1777fci r-rjixqe r-bcqeeo r-q4m81j r-qvutc0"]');
        
        await page.waitForSelector('div[class="public-DraftEditorPlaceholder-root"]');
        await page.click('div[class="public-DraftEditorPlaceholder-root"]');
        await page.type('div[data-focusvisible-polyfill="true"]', tweet);
        
        await page.waitForSelector('div[class="css-18t94o4 css-1dbjc4n r-l5o3uw r-42olwf r-sdzlij r-1phboty r-rs99b7 r-19u6a5r r-2yi16 r-1qi8awa r-1ny4l3l r-ymttw5 r-o7ynqc r-6416eg r-lrvibr"]');
        await page.click('div[class="css-18t94o4 css-1dbjc4n r-l5o3uw r-42olwf r-sdzlij r-1phboty r-rs99b7 r-19u6a5r r-2yi16 r-1qi8awa r-1ny4l3l r-ymttw5 r-o7ynqc r-6416eg r-lrvibr"]');

    } catch (error) {
        console.error('Error during the execution:', error);
    } finally {
        await browser.close();
    }
};

module.exports = { loginToTwitter }