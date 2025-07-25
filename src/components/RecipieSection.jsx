export default function RecipieSection({ recipe }) {
    return (
        <section>
            <h2>Chef Recommends:</h2>
            <article className="suggested-recipe-container" aria-live="polite">
                {recipe ? (
                    <div style={{ whiteSpace: 'pre-wrap' }}>
                        {recipe}
                    </div>
                ) : (
                    <p>Loading your personalized recipe...</p>
                )}
            </article>
        </section>
    );
}
