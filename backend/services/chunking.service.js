function chunkText(text, chunkSize = 200) {
  const words = text.split(" ");
  const chunks = [];
  let chunk = [];

  for (const word of words) {
    if (chunk.join(" ").length + word.length + 1 <= chunkSize) {
      chunk.push(word);
    } else {
      chunks.push(chunk.join(" "));
      chunk = [word];
    }
  }

  if (chunk.length > 0) {
    chunks.push(chunk.join(" "));
  }

  return chunks;
}

module.exports = chunkText;
