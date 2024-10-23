"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
function isInvalidText(text = "") {
  return !text || text.trim() === "";
}
function isValidEmail(email) {
  return email && email.includes("@");
}
export async function ShareMeal(prevState, formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };
//   console.log("MEAL : ", meal);
  if (isInvalidText(meal.title) || isInvalidText(meal.summary) || isInvalidText(meal.instructions) || isInvalidText(meal.creator) || !meal.image || !isValidEmail(meal.creator_email)) {
    return {
      message: "Invalid inputs!",
    };
  }
  await saveMeal(meal);
  redirect("/meals");
}
