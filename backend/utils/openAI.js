const OpenAI = require("openai");
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function extractArticleData(articleText) {
  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    reasoning: { effort: "medium" },
    input: `
      Extract structured metadata from the following article.  
      
      ARTICLE:
      """ 
      ${articleText}
      """

      Return ONLY valid JSON in this format:
      {
        "summary": "short paragraph",
        "keywords": ["keyword1", "keyword2", "keyword3"],
        "tags": ["tag1", "tag2", "tag3"]
      }
    `,
    text: {
      format: "json",
    },
  });

  return JSON.parse(response.output_text);
}

module.exports = { extractArticleData };
