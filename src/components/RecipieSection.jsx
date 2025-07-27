import Markdown from "react-markdown";
export default function RecipieSection(props) {
    const markdown = props.recipe;
    return (
        <section className='suggested-recipe-container'>
            <Markdown>{markdown}</Markdown>
        </section>
    );
}
