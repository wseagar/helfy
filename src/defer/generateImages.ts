// the `defer()` helper will be used to define a background function
import { defer } from "@defer/client";
import { Configuration, OpenAIApi } from "openai-edge";
import { sql } from "@vercel/postgres";
import { Credentials } from "aws-sdk";
import S3 from "aws-sdk/clients/s3";

// CREATE TABLE IF NOT EXISTS recipe (
//     id SERIAL PRIMARY KEY,
//     recipe_title TEXT,
//     likes INTEGER DEFAULT 0,
//     markdown TEXT,
//     images BYTEA[]
// );`;

const access = new Credentials({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
});

const s3 = new S3({
  credentials: access,
  region: "ap-southeast-2", //"us-west-2"
  signatureVersion: "v4",
});

const bucketName = "helfy-img";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function generateImages(id: string, title: string) {
  const image = await openai.createImage({
    prompt: `${title}, food photography, 15mm, warm light`,
  });

  const imageResponse = await image.json();
  console.log(imageResponse);

  const urls = imageResponse.data.map((d: any) => d.url);
  const blobs: ArrayBuffer[] = await Promise.all(
    urls.map((url: string) => fetch(url).then((r) => r.arrayBuffer()))
  );

  const images = blobs.map((blob) => Buffer.from(blob));

  const s3Urls = [];

  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    const params = {
      Bucket: bucketName,
      Key: `${id}-${i}.jpg`,
      Body: image,
      ACL: "public-read",
    };

    const result = await s3.upload(params).promise();
    s3Urls.push(result.Location);
  }

  await sql`UPDATE recipe SET image_urls = ${s3Urls as any} WHERE id = ${id}`;
}

export default defer(generateImages);
