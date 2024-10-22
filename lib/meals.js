import sql from "better-sqlite3";

const db = new sql("meals.db");

export async function getMeals() {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  //   throw new Error("Could not fetch meals!");
  return db.prepare("SELECT * FROM meals").all();
}
export async function getMeal(slug) {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  return db.prepare('SELECT * FROM meals WHERE slug = ? ').get(slug);
}
