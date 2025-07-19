
export default function Main() {
    function handleSubmit(e) {
        e.preventDefault();
        console.log("Submitted!");
    }
    
    return(
        <main>
            <form className="ingredient-form" onSubmit={handleSubmit}>
                <input
                    aria-label="Add ingredient"
                    type="text"
                    placeholder="e.g. Oregano"
                />
                <button type="submit">Add Ingredient</button>
            </form>
        </main>
    )
}
