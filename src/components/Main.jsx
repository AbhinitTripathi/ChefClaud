import { useState } from "react";

export default function Main() {
    // const ing = ["Oregano", "Basil", "Salt", "Pepper", "Garlic"]
    const [ingredients, setIngredients] = useState([]);
    
    function handleSubmit(form) {
        const input = form.get("ingredient");
        setIngredients(prev => [...prev, <li>{input}</li>]);
    }
    
    return(
        <main>
            <form className="ingredient-form" action={handleSubmit}>
                <input
                    aria-label="Add ingredient"
                    type="text"
                    placeholder="e.g. Oregano"
                    name = "ingredient"
                />
                <button type="submit">Add Ingredient</button>
            </form>
            {ingredients.length > 0 && (
                <section>
                    <h2>Ingredients on hand:</h2>
                    <ul className="ingredients-list" aria-live="polite">{ingredients}</ul>
                    <div className="get-recipie-container">
                        <div>
                            <h3>Ready for a recipie?</h3>
                            <p>Generate a recipie from your list of ingredients</p>
                        </div>
                        <button>Get Recipie</button>
                    </div>
                </section>
            )}
        </main>
    )
}
