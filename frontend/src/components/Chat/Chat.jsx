import React, { useState } from "react";
import axios from "axios";
import config from "../../config.json";
import { mirage } from "ldrs";

mirage.register();

const Chat = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const defaultQuestions = [
    "Summarize the document",
    "What is AI?",
    "How does machine learning work?",
    "What is the future of technology?",
    "Explain quantum computing.",
  ];

  const handleAsk = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${config.BACKEND_ENDPOINT}/question`, {
        question,
      });
      setAnswer(response.data.answer);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChipClick = (query) => {
    setQuestion(query);
  };

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#181407] dark group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="flex h-full grow flex-col px-8 py-6">
        <div className="w-full max-w-lg mx-auto flex flex-col gap-6 py-6">
          <div className="text-center mb-6">
            <h1 className="text-white text-3xl font-bold mb-2">
              Get quick answers to your questions
            </h1>
            <p className="text-gray-400 text-sm">
              Powered by the latest AI technology, our question-answering model
              can help you find the information you need.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {defaultQuestions.map((query, index) => (
              <button
                key={index}
                onClick={() => handleChipClick(query)}
                className="bg-[#FAC638] text-[#AB2217] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#e0b135]"
              >
                {query}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex w-full bg-[#30270D] rounded-lg overflow-hidden">
              <input
                placeholder="Ask me anything"
                className="flex-1 p-3 text-white bg-[#30270D] placeholder:text-[#D3B45F] border-none rounded-l-lg focus:outline-none"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <button
                onClick={handleAsk}
                className="bg-[#FAC638] text-[#AB2217] px-4 py-2 font-bold rounded-r-lg hover:bg-[#e0b135]"
              >
                Ask
              </button>
            </div>
            {loading && (
              <div className="flex items-center justify-center py-4">
                <l-mirage size="60" speed="2.5" color="white"></l-mirage>
              </div>
            )}
            {error && (
              <div className="text-red-500 text-center py-2">{error}</div>
            )}
            {answer && !loading && (
              <div className="bg-[#181408] p-4 rounded-lg shadow-md mt-4 border border-[#FBF8EE]">
                <h3 className="text-[#FBF8EE] text-sm font-normal leading-normal pb-2">
                  Answer
                </h3>
                <p className="text-[#A07D1C] text-sm font-normal leading-normal pb-2">
                  {answer}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
