import { useState } from "react";
import RecipieSection from "./RecipieSection.jsx"
import IngredientsList from "./IngredientsList.jsx";

export default function Main() {
    const [ingredients, setIngredients] = useState(["Salt", "Pepper", "Basil", "Oregano"]);
    const [recipieShown, setRecipieShown] = useState(false);
    const [recipe, setRecipe] = useState("");
    const [loading, setLoading] = useState(false);

    function handleSubmit(form) {
        const input = form.get("ingredient");
        setIngredients((prev) => [...prev, input]);
    }

    async function handleGetRecipie() {
        setLoading(true);
        try {
            const response = await fetch('/api/generate-recipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ingredients }),
            });
            
            const data = await response.json();
            
            if (response.ok) {
                setRecipe(data.recipe);
                setRecipieShown(true);
            } else {
                console.error('Error:', data.error);
                alert('Failed to generate recipe: ' + data.error);
            }
        } catch (error) {
            console.error('Failed to generate recipe:', error);
            alert('Failed to generate recipe. Please try again.');
        } finally {
            setLoading(false);
        }
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
                    loading={loading}
                />
            ): null}

            {recipieShown ? <RecipieSection recipe={recipe} /> : null}
        </main>
    );
}
