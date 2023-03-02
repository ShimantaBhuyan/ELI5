import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = "Explain in simple words, like I'm five years old: ";
const generateAction = async (req: NextApiRequest, res: NextApiResponse) => {
  // Run first prompt
  try {
    const baseCompletion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${basePromptPrefix}${req.body.searchValue}`,
      temperature: 0.8,
      max_tokens: 250,
    });

    const basePromptOutput = baseCompletion.data.choices.pop();

    res.status(200).json(JSON.stringify({ output: basePromptOutput }));
  } catch (error) {
    res.status(500).json(JSON.stringify({ error: error }));
  }
};

export default generateAction;
