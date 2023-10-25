require("../global-config.js");

const username = process.env.TWITTER_USERNAME;
const password = process.env.TWITTER_PASSWORD;


const {prompt2ChatGpt} = require('./poorOption/gptForPoors.js');
const {loginToTwitter} = require('./loginToTwitter');

const run = async () => {
    try {
        await loginToTwitter(username, password, await prompt2ChatGpt());

        process.exit(0);
    } catch (error) {
        console.error('Error during execution:', error);
        
        process.exit(1);
    }
}

run();