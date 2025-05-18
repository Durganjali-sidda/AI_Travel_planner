// src/AIModel.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Correct import for Vite-based env
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);

export const generateTravelPlan = async (promptText) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-pro-preview-03-25",
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
    let text = await response.text();

    console.log("Gemini Response:", text);

     text = text.trim();
    if (text.startsWith("```json")) {
      text = text.replace(/^```json\s*/, "").replace(/```$/, "").trim();
    }

    // Try parsing the response text as JSON
    const parsed = JSON.parse(text);
    return parsed;

  } catch (error) {
    console.error("Gemini API Error or Invalid JSON:", error);
    return null;
  }
};

