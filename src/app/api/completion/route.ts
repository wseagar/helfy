import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";

export const runtime = "edge";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const PROMPT_TEMPLATE = `
You are a expert meal planner with specialized knowledge about sustainable and low carbon foods.

You are going to help the user plan a meal that is both sustainable and low carbon and most importantly DELICIOUS.

The user will tell you what food they have available to them in their refrigerator and pantry. You can assume they have access to the basics.

Tell the user a recipe to make.

IMPORTANTLY INCLUDE INFORMATION ABOUT THE CARBON FOOTPRINT OF THE RECIPE AND THE SUSTAINABILITY OF THE INGREDIENTS.

Respond using markdown in the following format:

## <RECIPE NAME>

### Ingredients

| Ingredient | Quantity | Carbon Footprint | Sustainability |
| ---------- | -------- | ---------------- | -------------- |
|            |          |                  |                |

### Instructions

1. Step 1
2. Step 2
3. Step 3

### Sustainability

<EXPLAIN WHY THIS RECIPE IS SUSTAINABLE>
<GIVE ALTERNATIVE INGREDIENTS THAT ARE MORE SUSTAINABLE>
`;

export async function POST(req: Request) {
  const json = await req.json();
  const { prompt } = json;

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    // a precise prompt is important for the AI to reply with the correct tokens
    messages: [
      {
        role: "system",
        content: PROMPT_TEMPLATE,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    max_tokens: 800,
    temperature: 0.9,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
