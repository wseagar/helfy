import generateImages from "@/defer/generateImages";
import { sql } from "@vercel/postgres";

export const runtime = "edge";

type RecipeInput = {
  markdown: string;
};

export async function POST(req: Request) {
  const { markdown } = (await req.json()) as RecipeInput;

  const title = markdown.split("\n")[0].replace("#", "").trim();

  const { rows } =
    await sql`INSERT INTO recipe (recipe_title, markdown) VALUES (${title}, ${markdown}) RETURNING *`;

  const recipe = rows[0];
  const id = recipe.id;

  await generateImages(id, title);

  return {
    status: 200,
    body: rows[0],
  };
}
