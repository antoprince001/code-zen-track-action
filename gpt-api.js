const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
apiKey: '',
});
const openai = new OpenAIApi(configuration);

async function fetchGPTResponse(promptText) {
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
    console.log(response.data)
    console.log(response.data.choices)
    console.log(response.data.choices[0].text.trim())

    return response.data
}
let promptText='Assume you are Elon Musk from Twitter  who is honest, sarcastic. I am a github user whose pipeline failed 10 times in last hour. Your response should not be discouraging. Tell me joke to cheer in less than 25 words'
res = fetchGPTResponse(promptText)
