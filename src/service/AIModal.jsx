// src/AIModel.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Correct import for Vite-based env
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);

export const generateTravelPlan = async (promptText) => {
  try {

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-pro-exp-02-05", // Fast & latest supported
      generationConfig: {
        temperature: 0.8,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192,
        
      }
    });

    const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: promptText }] }],
        
      });
    const response = await result.response;
    const text = await response.text();

    console.log("Gemini Response:", text);
    
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};
