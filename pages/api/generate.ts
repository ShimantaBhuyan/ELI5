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
    const baseCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `${basePromptPrefix}${req.body.searchValue}` }],
    });

    // @ts-ignore
    const basePromptOutput = baseCompletion.data.choices[0].message.content;

    res.status(200).json(JSON.stringify({ output: basePromptOutput }));
  } catch (error) {
    res.status(500).json(JSON.stringify({ error: error }));
  }
};

export default generateAction;
