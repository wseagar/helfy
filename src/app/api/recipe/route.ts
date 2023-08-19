import generateImages from "@/defer/generateImages";
import { sql } from "@vercel/postgres";

type RecipeInput = {
  markdown: string;
};

export async function GET() {
  const { rows } = await sql`SELECT * FROM recipe ORDER BY id DESC LIMIT 10`;

  return new Response(JSON.stringify(rows), {
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function POST(req: Request) {
  const { markdown } = (await req.json()) as RecipeInput;

  const title = markdown.split("\n")[0].replaceAll("#", "").trim();

  const { rows } =
    await sql`INSERT INTO recipe (recipe_title, markdown) VALUES (${title}, ${markdown}) RETURNING *`;

  const recipe = rows[0];
  const id = recipe.id;

  await generateImages(id, title);

  return new Response(JSON.stringify(recipe), {
    headers: {
      "content-type": "application/json",
    },
  });
}
