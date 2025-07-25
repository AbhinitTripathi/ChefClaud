export default function IngredientsList(props) {
    // Remove this later
    const ingredientsListTest = props.ingredients.map((ingredient, index) => {
        return <li key={index}>{ingredient}</li>;
    })
    // Remove this later
    return (
        <section>
            <h2>Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite">
                {/* Replace with props.ingredients later */}
                {ingredientsListTest}
            </ul>
            {props.ingredients.length >= 3 ? (
                <div className="get-recipie-container">
                    <div>
                        <h3>Ready for a recipie?</h3>
                        <p>
                            Generate a recipie from your list of
                            ingredients
                        </p>
                    </div>
                    <button onClick={props.handleGetRecipie}>
                        Get Recipie
                    </button>
                </div>
            ) : (
                <p>
                    Chef needs at least 3 ingredients to create a
                    recipie
                </p>
            )}
        </section>
    )
}