const pdfParse = require("pdf-parse");
const chunkText = require("../services/chunking.service");
const performNER = require("../services/ner.service");
const { generateEmbeddings } = require("../services/embeddings.service");
const { storeEmbeddingsInPinecone } = require("../services/pinecone.service");

const uploadPDFController = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  try {
    const extractedText = await pdfParse(req.file.buffer);
    const text = extractedText.text;

    //1. chunking
    const chunks = chunkText(text);

    //2. process each chunk: NER, Embedding, Store in Pinecone
    const embeddings = [];
    const metadata = [];

    for (const chunk of chunks) {
      //NER
      const entities = await performNER(chunk);

      //vector embedding
      const embedding = await generateEmbeddings(chunk);

      if (embedding) {
        embeddings.push(embedding);
        metadata.push({ text: chunk, entities });
      }
    }
    // store embeddings in pinecone
    await storeEmbeddingsInPinecone(embeddings, metadata);
    console.log("stored");
    res.json({ message: "Document processed and stored successfully." });
  } catch (error) {
    console.error("Error processing document:", error);
    res.status(500).send("An error occurred while processing the document.");
  }
};

module.exports = uploadPDFController;
