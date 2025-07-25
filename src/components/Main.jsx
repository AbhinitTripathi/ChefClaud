import { useState } from "react";
import RecipieSection from "./RecipieSection.jsx"
import IngredientsList from "./IngredientsList.jsx";

export default function Main() {
    const [ingredients, setIngredients] = useState(["Salt", "Pepper", "Basil", "Oregano"]);
    const [recipieShown, setRecipieShown] = useState(false);

    // Remove this later
    const ingredientsListTest = ingredients.map((ingredient, index) => {
        return <li key={index}>{ingredient}</li>;
    })
    // Remove this later

    function handleSubmit(form) {
        const input = form.get("ingredient");
        setIngredients((prev) => [...prev, input]);
    }

    function handleGetRecipie() {
        setRecipieShown(prevState => !prevState);
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
                    ingredientsListTest={ingredientsListTest}
                />
            ): null}

            {recipieShown ? <RecipieSection /> : null}
        </main>
    );
}
