// src/getRecipeFromAI.js
import { InferenceClient } from "@huggingface/inference";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.
`;

console.log(import.meta.env.VITE_HUGGING_FACE_API_KEY)
const client = new InferenceClient({
  apiKey: import.meta.env.VITE_HUGGING_FACE_API_KEY
});

export async function getRecipeFromAI(ingredientsList) {
  const ingredientsString = ingredientsList.join(", ");

  try {
    const response = await client.chatCompletion({
      model: "HuggingFaceH4/zephyr-7b-alpha", // free and friendly model
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `I have these ingredients: ${ingredientsString}. Please suggest a recipe I can make with them.`,
        },
      ],
    });

    return (
      response.choices?.[0]?.message?.content || "No recipe could be generated."
    );
  } catch (error) {
    console.error("Error calling Hugging Face API:", error);
    return "Sorry, something went wrong while generating the recipe.";
  }
}
