import { useState } from "react";
import RecipieSection from "./RecipieSection.jsx";
import IngredientsList from "./IngredientsList.jsx";
import { getRecipeFromAI } from "./ai.js";

export default function Main() {
    const [ingredients, setIngredients] = useState([]);
    const [recipe, setRecipe] = useState("");

    function handleSubmit(form) {
        const input = form.get("ingredient");
        setIngredients((prev) => [...prev, input]);
    }

    async function getRecipe() {
        console.log("Generating...")
        const recipeMarkdown = await getRecipeFromAI(ingredients);
        setRecipe(recipeMarkdown);
    }

    return (
        <main>
            <form className="ingredient-form" action={handleSubmit}>
                <input
                    aria-label="Add ingredient"
                    type="text"
                    placeholder="e.g. Oregano"
                    name="ingredient"
                    required
                />
                <button type="submit">Add Ingredient</button>
            </form>

            {ingredients.length > 0 ? (
                <IngredientsList
                    getRecipe={getRecipe}
                    ingredients={ingredients}
                />
            ) : null}

            {recipe.length > 0 ? <RecipieSection recipe={recipe} /> : null}
        </main>
    );
}
