const axios = require("axios");
require("dotenv").config();

//client
const azureOpenAIClient = axios.create({
  baseURL: process.env.AZURE_OPENAI_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
    "api-key": process.env.AZURE_OPENAI_API_KEY,
  },
});

async function generateEmbeddings(text, model = "text-embedding-ada-002") {
  try {
    const response = await azureOpenAIClient.post(
      `/openai/deployments/${model}/embeddings?api-version=${process.env.AZURE_OPENAI_API_VERSION}`,
      { input: [text] }
    );

    if (
      response.data &&
      response.data.data &&
      Array.isArray(response.data.data)
    ) {
      return response.data.data[0].embedding;
    } else {
      console.error("Unexpected response format:", response.data);
      return null;
    }
  } catch (error) {
    console.error(
      "Error generating embeddings:",
      error.response?.data || error.message
    );
    return null;
  }
}

module.exports = { generateEmbeddings };
