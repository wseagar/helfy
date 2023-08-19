import { sql } from "@vercel/postgres";
import { Completion } from "./components/completion";

export type Recipe = {
  id: number;
  recipe_title: string;
  likes: number;
  markdown: string;
  image_urls: string[];
};

const wordsToNotCapitalize = [
  "a",
  "an",
  "and",
  "as",
  "at",
  "but",
  "by",
  "for",
  "in",
  "nor",
  "of",
  "on",
  "or",
  "per",
  "the",
  "to",
  "vs",
  "via",
  "with",
  "without",
];

function capitalize(str: string) {
  const words = str.split(" ");
  const capitalizedWords = words.map((word, index) => {
    if (index === 0 || !wordsToNotCapitalize.includes(word.toLowerCase())) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    return word;
  });
  return capitalizedWords.join(" ");
}

export default async function Home() {
  const { rows } = await sql`SELECT * FROM recipe ORDER BY likes DESC LIMIT 10`;
  const recipes: Recipe[] = rows
    .map((row) => ({
      id: row.id,
      recipe_title: capitalize(row.recipe_title),
      likes: row.likes,
      markdown: row.markdown,
      image_urls: row.image_urls || [],
    }))
    .filter((recipe) => recipe.image_urls.length > 0);

  return (
    <main className="min-h-screen flex justify-center bg-gray-950">
      <Completion recipes={recipes} />
    </main>
  );
}
