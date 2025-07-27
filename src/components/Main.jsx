import { useState } from "react";
import RecipieSection from "./RecipieSection.jsx"
import IngredientsList from "./IngredientsList.jsx";
import { getRecipeFromAI } from "./ai.js"

export default function Main() {
    const [ingredients, setIngredients] = useState(["Salt", "Pepper", "Basil", "Oregano"]);
    const [recipieShown, setRecipieShown] = useState(false);

    function handleSubmit(form) {
        const input = form.get("ingredient");
        setIngredients((prev) => [...prev, input]);
    }

    async function handleGetRecipie() {
        const recipeMarkdown = await getRecipeFromAI(ingredients);
        console.log(recipeMarkdown);
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

            {ingredients.length > 0 ?(
                <IngredientsList 
                    handleGetRecipie={handleGetRecipie}
                    ingredients={ingredients}
                />
            ): null}

            {recipieShown ? <RecipieSection /> : null}
        </main>
    );
}