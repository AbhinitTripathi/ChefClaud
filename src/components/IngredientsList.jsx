import { useState, useEffect } from 'react';

export default function RecipeSection({ ingredients, getRecipe }) {
    const [isGenerating, setIsGenerating] = useState(false);
    const [dots, setDots] = useState('C');

    useEffect(() => {
        if (!isGenerating) return;

        const dotFrames = ['C', 'Co', 'Coo', 'Cook', 'Cooki', 'Cookin', 'Cooking', 'Cookingg', 'Cookinggg'];
        let frame = 0;

        const interval = setInterval(() => {
            setDots(dotFrames[frame]);
            frame = (frame + 1) % dotFrames.length;
        }, 200); // every 500ms

        setDots('C');
        return () => clearInterval(interval); // cleanup when unmounting or generating stops
    }, [isGenerating]);

    const handleGenerate = async () => {
        setIsGenerating(true);
        await getRecipe();  // assumes async
        setIsGenerating(false);
    };

    return (
        <section>
            <h2>Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite">
                {ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>

            {ingredients.length > 3 && (
                <div className="get-recipie-container">
                    <div>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button onClick={handleGenerate} disabled={isGenerating}>
                        {isGenerating ? dots : 'Get a recipe'}
                    </button>
                </div>
            )}
        </section>
    );
}
