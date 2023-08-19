import { sql } from "@vercel/postgres";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { rows } = await sql`SELECT * FROM recipe WHERE id = ${params.id}`;
  return new Response(JSON.stringify(rows[0]), {
    headers: {
      "content-type": "application/json",
    },
  });
}
