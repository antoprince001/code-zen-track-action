require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");


async function fetchGPTResponse(promptText) {

     const configuration = new Configuration({
          apiKey: process.env.OPENAI_API_KEY
     });

     const openai = new OpenAIApi(configuration);


     const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: promptText,
          temperature: 0.9,
          max_tokens: 150,
          top_p: 1,
          frequency_penalty: 0.0,
          presence_penalty: 0.6,
          stop: [" Human:", " AI:"],
     });

     if (response && response.data && response.data.choices) {
          return response.data.choices[0].text.trim()
     }
     else {
          return "Keep rocking as always !"
     }
}
// let promptText='Assume you are Elon Musk from Twitter  who is honest, sarcastic. I am a github user whose pipeline failed 10 times in last hour. Your response should not be discouraging. Judge my contribution to cheer in less than 25 words'

module.exports.fetchGPTResponse = fetchGPTResponse;