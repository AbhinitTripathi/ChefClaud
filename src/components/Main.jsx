import { useEffect, useState, useRef } from "react";
import RecipieSection from "./RecipieSection.jsx";
import IngredientsList from "./IngredientsList.jsx";
import { getRecipeFromAI } from "./ai.js";

export default function Main() {
    const [ingredients, setIngredients] = useState([]);
    const [recipe, setRecipe] = useState("");
    const recipeSection = useRef(null);

    useEffect(() => {
        if(recipe !== "" && recipeSection.current !== null) {
            recipeSection.current.scrollIntoView({ behavior:"smooth" });
        }
    }, [recipe, recipeSection])

    function handleSubmit(form) {
        const input = form.get("ingredient");
        setIngredients((prev) => [...prev, input]);
    }

    function handleRemove(index) {
        setIngredients(prev => prev.filter((_, i) => i !== index));
    }

    async function getRecipe() {
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
                    ref={recipeSection}
                    getRecipe={getRecipe}
                    ingredients={ingredients}
                    handleRemove={handleRemove}
                />
            ) : null}

            {recipe.length > 0 ? <RecipieSection recipe={recipe} /> : null}
        </main>
    );
}
