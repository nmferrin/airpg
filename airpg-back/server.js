const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");


dotenv.config();

const app = express();
app.use(cors());

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
//model config

// For text-only input, use the gemini-pro model
const model = genAI.getGenerativeModel({ model: "gemini-pro"});

async function run() {
  const parts = [
    {text: "You are a master storyteller. Create a thrilling scenario where the user controls the main protagonist. Create an initial situation and allow the user to react, and advance the scenario from there. Judge a reasonable reward or punishment based on the user's actions and end the story if they die. Keep responses relatively short"},
    {text: "Action: "},
    {text: "Outcome: "},
  ];
  generationConfig = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 0,
    "max_output_tokens": 8192,
  }
  //safety settings
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });
  const response = await result.response;
  const text = await response.text();
  return text;
}

app.get('/', async (req, res) => {
  try {
    const storyText = await run();
    res.send(storyText);
  } catch (error) {
    console.error("Error generating the story: ", error);
    res.status(500).send("Error generating the story.");  }
  });

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});