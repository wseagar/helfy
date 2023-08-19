import { sql } from "@vercel/postgres";
// dirty hackathon hack...
// API route that migrates the DB

export async function POST(req: Request) {
  console.log("Starting migration");
  await sql`CREATE TABLE IF NOT EXISTS recipe (
          id SERIAL PRIMARY KEY,
          recipe_title TEXT,
          likes INTEGER DEFAULT 0,
          markdown TEXT,
          image_urls TEXT[]
      );`;
  console.log("Finished migration");
  return {
    status: 200,
    body: "OK",
  };
}
