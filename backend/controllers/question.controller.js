const { rag } = require("../services/ai_integration");

const askquestionController = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required." });
    }
    const answer = await rag(question);

    return res.status(200).json({ answer });
  } catch (error) {
    console.error("Error in askquestionController:", error.message);
    return res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
};

module.exports = { askquestionController };
