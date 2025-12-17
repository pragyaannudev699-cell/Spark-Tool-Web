import { GoogleGenAI, Type, Schema, GenerateContentResponse } from "@google/genai";
import { CoffeeRecipe, BeanAnalysisResult } from "../types";

// Helper to get AI instance
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

const RECIPE_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    description: { type: Type.STRING },
    difficulty: { type: Type.STRING, enum: ['Easy', 'Medium', 'Expert'] },
    prepTime: { type: Type.STRING },
    ingredients: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          amount: { type: Type.STRING }
        },
        required: ['name', 'amount']
      }
    },
    steps: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          instruction: { type: Type.STRING },
          duration: { type: Type.STRING }
        },
        required: ['instruction']
      }
    },
    tags: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    }
  },
  required: ['title', 'description', 'difficulty', 'prepTime', 'ingredients', 'steps', 'tags']
};

export const generateRecipe = async (
  prompt: string, 
  preferences: string
): Promise<CoffeeRecipe> => {
  const ai = getAI();
  const fullPrompt = `Create a unique coffee recipe based on these preferences: "${preferences}". 
  Specific request: "${prompt}". 
  Be creative but practical. Ensure measurements are precise.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: fullPrompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: RECIPE_SCHEMA,
      systemInstruction: "You are a world-class barista and mixologist specializing in coffee beverages."
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  
  return JSON.parse(text) as CoffeeRecipe;
};

const BEAN_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    roastLevel: { type: Type.STRING },
    probableOrigin: { type: Type.STRING },
    tastingNotes: { type: Type.ARRAY, items: { type: Type.STRING } },
    brewingRecommendation: { type: Type.STRING },
    confidence: { type: Type.STRING }
  },
  required: ['roastLevel', 'probableOrigin', 'tastingNotes', 'brewingRecommendation', 'confidence']
};

export const analyzeBeans = async (base64Image: string): Promise<BeanAnalysisResult> => {
  const ai = getAI();
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: base64Image
          }
        },
        {
          text: "Analyze this image of coffee beans or coffee packaging. Identify the roast level (Light, Medium, Dark), probable origin (if packaging is visible or based on bean appearance), likely tasting notes, and a brewing recommendation."
        }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: BEAN_SCHEMA
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");

  return JSON.parse(text) as BeanAnalysisResult;
};

export const chatWithBarista = async (history: {role: string, parts: {text: string}[]}[], message: string) => {
  const ai = getAI();
  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    history: history,
    config: {
      systemInstruction: "You are Coffee Spark, a friendly, enthusiastic, and highly knowledgeable AI Barista. You help users with brewing techniques, bean selection, and troubleshooting. Keep answers concise but helpful.",
    }
  });

  const result: GenerateContentResponse = await chat.sendMessage({ message });
  return result.text || "I'm having trouble brewing a response right now.";
};
