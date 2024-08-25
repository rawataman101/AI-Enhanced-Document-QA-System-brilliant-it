const { Pinecone } = require("@pinecone-database/pinecone");
const { generateEmbeddings } = require("../services/embeddings.service");
require("dotenv").config();

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});
const index = pc.index(process.env.PINECONE_INDEX_NAME);

async function storeEmbeddingsInPinecone(embeddings, metadata) {
  try {
    if (!Array.isArray(embeddings) || !Array.isArray(metadata)) {
      throw new Error("Embeddings and metadata must be arrays.");
    }

    const vectors = embeddings.map((embedding, i) => ({
      id: `doc_${i}`,
      values: embedding,
      metadata: metadata[i],
    }));

    if (vectors.length === 0) {
      throw new Error("No vectors to upsert.");
    }

    // Perform the upsert operation
    await index.upsert(vectors);

    console.log("Upsert successful.");
  } catch (error) {
    console.error("Upsert failed:", error.message);
  }
}

async function queryPinecone(
  queryText,
  topK = 5,
  modelName = "text-embedding-ada-002"
) {
  const queryEmbedding = await generateEmbeddings(queryText, modelName);

  if (!queryEmbedding) {
    throw new Error("Failed to generate query embedding");
  }

  const queryRequest = {
    topK,
    vector: queryEmbedding,
    includeMetadata: true,
  };

  const result = await index.query(queryRequest);
  return result.matches;
}

module.exports = { storeEmbeddingsInPinecone, queryPinecone };
