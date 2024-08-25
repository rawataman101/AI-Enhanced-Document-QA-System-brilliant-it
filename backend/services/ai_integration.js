const axios = require("axios");
const { queryPinecone } = require("../services/pinecone.service");
require("dotenv").config();

const apiKey = process.env.AZURE_OPENAI_API_KEY;
const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiVersion = process.env.AZURE_OPENAI_API_VERSION;
const deployment = process.env.AZURE_OPENAI_CHAT_DEPLOYMENT_NAME;

async function generateResponse(prompt) {
  try {
    const response = await axios.post(
      `${endpoint}/openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`,
      {
        messages: [{ role: "user", content: prompt }],
        max_tokens: 200,
        temperature: 0,
      },
      {
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    const choice = response.data.choices[0].message.content;
    // console.log("Generated response:", choice);
    return choice;
  } catch (error) {
    console.error(
      "Error generating response:",
      error.response?.data || error.message
    );
    return null;
  }
}

async function rag(queryText) {
  try {
    const matches = await queryPinecone(queryText);
    const relevantChunks = matches
      .map((match) => match.metadata.text)
      .join("\n\n");

    const prompt = `Context: \n${relevantChunks}\n\nQuestion: ${queryText}\nAnswer:`;

    const res = await generateResponse(prompt);

    return res;
  } catch (error) {
    console.error("Error in RAG pipeline:", error.message);
    return null;
  }
}

module.exports = { rag };
