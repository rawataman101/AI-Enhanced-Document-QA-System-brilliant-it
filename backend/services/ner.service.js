const axios = require("axios");
require("dotenv").config();

const apiKey = process.env.AZURE_OPENAI_API_KEY;
const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiVersion = process.env.AZURE_OPENAI_API_VERSION;
const deployment = "gpt-35-turbo";

async function performNER(text) {
  try {
    const response = await axios.post(
      `${endpoint}/openai/deployments/${deployment}/completions?api-version=${apiVersion}`,
      {
        prompt: `Perform NER on this text: ${text}. Output entities with their type and confidence score`,
        max_tokens: 100,
        temperature: 0,
      },
      {
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    const choice = response.data.choices[0].text;
    // console.log(choice);
    return choice;
  } catch (error) {
    console.error(
      "Error performing NER:",
      error.response?.data || error.message
    );
    return null;
  }
}

module.exports = performNER;
