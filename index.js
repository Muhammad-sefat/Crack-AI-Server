const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.get("/prompt", async (req, res) => {
  const prompt = "Write a story about a AI and magic";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  res.send({ data: text, status: 200 });
});

app.get("/", (req, res) => {
  res.send("Crack AI Server is Runing");
});
app.listen(port, () => {
  console.log(`Crack AI Server is Runing from ${port}`);
});
