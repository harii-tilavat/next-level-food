import fs from "node:fs";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = new sql("meals.db");

export async function getMeals() {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  //   throw new Error("Could not fetch meals!");
  return db.prepare("SELECT * FROM meals").all();
}
export async function getMeal(slug) {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  return db.prepare("SELECT * FROM meals WHERE slug = ? ").get(slug);
}
export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);
  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (err) => {
    if (err) {
      throw new Error("Saving file failed!", err);
    }
  });
  meal.image = `/images/${fileName}`;

  db.prepare(
    `
    INSERT INTO meals (slug, title, image, summary, instructions, creator, creator_email)
    VALUES (@slug, @title, @image, @summary, @instructions, @creator, @creator_email)
    `
  ).run(meal);
  console.log("Data inserted successfully!");
}
