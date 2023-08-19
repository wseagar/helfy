// the `defer()` helper will be used to define a background function
import { defer } from "@defer/client";
import { Configuration, OpenAIApi } from "openai-edge";
import { sql } from "@vercel/postgres";
import { S3 } from "@aws-sdk/client-s3";

// CREATE TABLE IF NOT EXISTS recipe (
//     id SERIAL PRIMARY KEY,
//     recipe_title TEXT,
//     likes INTEGER DEFAULT 0,
//     markdown TEXT,
//     images BYTEA[]
// );`;

const s3 = new S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  region: "ap-southeast-2", //"us-west-2"
});

const bucketName = "helfy-img";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function generateImages(id: string, title: string) {
  try {
    console.log("openai.createImage", id, title);
    const image = await openai.createImage({
      prompt: `${title}, food photography, 15mm, warm light`,
    });

    const imageResponse = await image.json();
    console.log("openai.imageResponse", imageResponse);

    const urls = imageResponse.data.map((d: any) => d.url);
    console.log("urls", urls);
    const buffers: ArrayBuffer[] = await Promise.all(
      urls.map((url: string) => fetch(url).then((r) => r.arrayBuffer()))
    );
    console.log("buffers", buffers.length);

    const images = buffers.map((blob) => Buffer.from(blob));
    console.log("images", images.length);

    const s3Urls = [];

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const params = {
        Bucket: bucketName,
        Key: `${id}-${i}.jpg`,
        Body: image,
      };

      console.log("s3.upload", params);
      const result = await s3.putObject({
        Bucket: bucketName,
        Key: `${id}-${i}.jpg`,
        Body: image,
      });

      console.log("s3.upload.complete");
      s3Urls.push(
        `https://${bucketName}.s3-ap-southeast-2.amazonaws.com/${id}-${i}.jpg`
      );
    }

    console.log("s3Urls", s3Urls);
    await sql`UPDATE recipe SET image_urls = ${s3Urls as any} WHERE id = ${id}`;
    console.log("sql");
  } catch (e) {
    console.error(e);
  }
}

export default defer(generateImages);
