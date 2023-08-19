import { Completion } from "@/app/components/completion";
import { Recipe, capitalize } from "@/app/page";
import { sql } from "@vercel/postgres";

export default async function Page({ params }: { params: { id: string } }) {
  const { rows } =
    await sql`SELECT * FROM recipe ORDER BY likes DESC, id DESC LIMIT 10`;
  const recipes: Recipe[] = rows
    .map((row) => ({
      id: row.id,
      recipe_title: capitalize(row.recipe_title),
      likes: row.likes,
      markdown: row.markdown,
      image_urls: row.image_urls || [],
    }))
    .filter((recipe) => recipe.image_urls.length > 0);

  const thisRecipie = await sql`SELECT * FROM recipe WHERE id = ${params.id}`;
  const thisRecipieData = thisRecipie.rows[0];

  return (
    <main className="min-h-screen flex justify-center bg-gray-950">
      <Completion
        recipes={recipes}
        recipeId={Number(params.id)}
        initialCompletion={thisRecipieData.markdown}
      />
    </main>
  );
}
