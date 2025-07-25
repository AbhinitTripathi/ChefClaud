
import express from 'express';
import cors from 'cors';
import { HfInference } from '@huggingface/inference';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`;

// Initialize Hugging Face inference
const hf = new HfInference(process.env.HUGGING_FACE_API_KEY);

// Recipe generation endpoint
app.post('/api/generate-recipe', async (req, res) => {
  try {
    const { ingredients } = req.body;
    
    if (!process.env.HUGGING_FACE_API_KEY) {
      return res.status(500).json({ error: 'Hugging Face API key not configured' });
    }

    if (!ingredients || !Array.isArray(ingredients)) {
      return res.status(400).json({ error: 'Invalid ingredients array' });
    }

    const ingredientsString = ingredients.join(', ');
    
    // Use text generation with a suitable model
    const response = await hf.textGeneration({
      model: 'microsoft/DialoGPT-large',
      inputs: `${SYSTEM_PROMPT}\n\nUser: I have these ingredients: ${ingredientsString}. Please suggest a recipe I can make with them.\n\nAssistant:`,
      parameters: {
        max_new_tokens: 500,
        temperature: 0.7,
        return_full_text: false,
      },
    });

    res.json({ recipe: response.generated_text });
    
  } catch (error) {
    console.error('Error generating recipe:', error);
    res.status(500).json({ error: 'Failed to generate recipe. Please try again.' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
