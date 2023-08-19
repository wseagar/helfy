import { sql } from "@vercel/postgres";
import { Configuration, OpenAIApi } from "openai-edge";

export const runtime = "edge";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

type RecipeInput = {
  markdown: string;
};

export async function POST(req: Request) {
  const startTimer = Date.now();
  const { markdown } = (await req.json()) as RecipeInput;

  const title = markdown.split("\n")[0].replace("#", "").trim();

  const image = await openai.createImage({
    prompt: `${title}, food photography, 15mm, warm light`,
  });

  const imageResponse = await image.json();
  console.log(imageResponse);

  const urls = imageResponse.data.map((d: any) => d.url);
  const blobs = await Promise.all(
    urls.map((url: string) => fetch(url).then((r) => r.blob()))
  );

  const { rows } =
    await sql`INSERT INTO recipe (recipe_title, markdown, image_urls) VALUES (${title}, ${markdown}, ${urls}) RETURNING *`;

  console.log(`Finished in ${Date.now() - startTimer}ms`);
  console.log(`If longer than 10s this will not run on Vercel`);
  const isLongerThan10s = Date.now() - startTimer > 10000;
  if (isLongerThan10s) {
    console.log(`This will not run on Vercel`);
  }

  return {
    status: 200,
    body: rows[0],
  };
}
