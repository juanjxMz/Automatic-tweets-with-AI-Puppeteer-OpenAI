const apiKey = process.env.API_KEY;
const { OpenAI } = require('openai')

const openai = new OpenAI({
    apiKey: apiKey,
})

const openAiApi = async () => {
const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{"role": "user", "content": "Generate a dev quote for twitter"}],
    maxTokens: 30,
    temperature: 0.7,
  });
  const responseText = chatCompletion.data.choices[0].text;
  const trimmedResponse = responseText.slice(0, 140);
  return trimmedResponse;
}

module.exports = { openAiApi };