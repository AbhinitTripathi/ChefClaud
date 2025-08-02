import Markdown from "react-markdown";
export default function RecipieSection(props) {
    const markdown = props.recipe;
    return (
        <section className='suggested-recipe-container' aria-live="polite">
            <h2>Chef Recommends:</h2>
            <Markdown>{markdown}</Markdown>
        </section>
    );
}
