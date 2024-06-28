const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const form = `
<form method="POST" action="/prompt">
<textarea name="prompt" id="prompt"></textarea>
<button type="submit">Generate</button>
</form>

`;

app.use(express.urlencoded({ extended: true }));

app.get("/prompt", async (req, res) => {
  res.send(form);
});

app.post("/prompt", async (req, res) => {
  let { prompt } = req.body;
  prompt = prompt + ". data will be in json stringify version";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  const rsp = text.split("json\n")[1].split("```")[0];
  res.send({ data: JSON.parse(rsp), status: 200 });
});

app.get("/", (req, res) => {
  res.send("Crack AI Server is Runing");
});
app.listen(port, () => {
  console.log(`Crack AI Server is Runing from ${port}`);
});
