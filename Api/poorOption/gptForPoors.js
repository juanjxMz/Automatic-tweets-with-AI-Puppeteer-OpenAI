const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const googleUsername = process.env.EMAIL_USER;
const googlePassword = process.env.EMAIL_PASSWORD;
//Choose a prompt from
const promptText = 'Generate a random quote'

puppeteer.use(StealthPlugin());

const prompt2ChatGpt = async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36'; 
    await page.setUserAgent(ua);
    
    await page.setViewport({ width: 1280, height: 800 });

    try {
        await page.goto('https://chat.openai.com/auth/login');

    
        await page.click('button[data-testid="login-button"]');
        await page.waitForSelector('button[data-provider="google"]');
        await page.click('button[data-provider="google"]');
        
        await page.waitForSelector('input[type="email"]');
        await page.type('input[type="email"]', googleUsername);
        
        await page.waitForTimeout(500);
        await page.keyboard.press('Enter');

        await page.waitForTimeout(7000);
        await page.waitForSelector('input[type="password"]');
        for (let i = 0; i < 2; i++) {
        await page.type('input[type="password"]', googlePassword);
        await page.keyboard.press('Enter');
        }

        await page.waitForSelector('button[class="btn relative btn-primary"]');
        await page.click('button[class="btn relative btn-primary"]');

        await page.type('#prompt-textarea', promptText);
        await page.keyboard.press('Enter');

        await page.waitForSelector('div[class="markdown prose w-full break-words dark:prose-invert light"]');
        const elementHandle = await page.$('div[class="markdown prose w-full break-words dark:prose-invert light"]');
        let text = await page.evaluate(element => element.textContent, elementHandle);
    
        return text;

    } catch (error) {
        console.error('Error during the execution:', error);
    } 
};

module.exports = { prompt2ChatGpt }