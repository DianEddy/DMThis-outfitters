
import { GoogleGenAI, Type } from "@google/genai";
import { DesignConfig, QuoteResult } from "../types";

export const getQuoteAndAnalysis = async (design: DesignConfig): Promise<QuoteResult> => {
  // Create a new GoogleGenAI instance right before making an API call to ensure fresh configuration.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  // Use gemini-3-pro-preview for complex reasoning tasks like bespoke tailoring analysis and labor estimation.
  const model = "gemini-3-pro-preview";
  
  const prompt = `
    As a high-end bespoke tailor and fashion expert at DMThis Outfitters, analyze this custom ${design.category} design.
    
    Specifications:
    - Item Type: ${design.category}
    - Silhouette: ${design.silhouette}
    - Neckline: ${design.neckline}
    - Sleeve Style: ${design.sleeveStyle}
    - Length: ${design.length}
    - Fabric Source: ${design.fabricSourceType}
    - Fabric Details: ${design.fabricSourceType === 'upload' ? 'Image provided' : design.fabricData}
    - Notes: ${design.additionalNotes || 'Standard construction'}

    Analyze complexity and provide a quote reflecting premium bespoke standards ($200 - $8,000 range).
  `;

  const contents: any[] = [{ text: prompt }];
  
  if (design.fabricSourceType === 'upload' && design.fabricData) {
    contents.push({
      inlineData: {
        mimeType: 'image/jpeg',
        data: design.fabricData.split(',')[1],
      },
    });
  }

  const response = await ai.models.generateContent({
    model,
    contents: { parts: contents },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          estimatedPrice: { type: Type.STRING },
          laborHours: { type: Type.STRING },
          complexity: { type: Type.STRING, enum: ["Low", "Medium", "High", "Exquisite"] },
          breakdown: { type: Type.ARRAY, items: { type: Type.STRING } },
          fabricAnalysis: { type: Type.STRING }
        },
        required: ["estimatedPrice", "laborHours", "complexity", "breakdown", "fabricAnalysis"]
      },
      // Only googleSearch is permitted when used with model analysis if needed.
      tools: design.fabricSourceType === 'link' ? [{ googleSearch: {} }] : undefined,
    },
  });

  // Access the text property directly from the response.
  const responseText = response.text || '{}';
  const result = JSON.parse(responseText.trim());
  
  // Extract website URLs from groundingChunks if Google Search was used.
  const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
  if (groundingChunks) {
    result.sources = groundingChunks
      .filter((chunk: any) => chunk.web)
      .map((chunk: any) => ({ title: chunk.web.title, uri: chunk.web.uri }));
  }

  return result;
};

export const generatePreviewImage = async (design: DesignConfig): Promise<string | undefined> => {
  // Create a new GoogleGenAI instance right before making an API call.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  // Use gemini-2.5-flash-image for general image generation tasks.
  const model = 'gemini-2.5-flash-image';
  const prompt = `A professional high-fashion illustration of a custom ${design.category}. 
    Silhouette: ${design.silhouette}. ${design.category === 'Dress' || design.category === 'Top' || design.category === 'Jumpsuit' ? `Neckline: ${design.neckline}, Sleeves: ${design.sleeveStyle}.` : ''} 
    Length: ${design.length}. 
    Style: Minimalist boutique concept art, high-end fabric texture, white studio background.`;

  const response = await ai.models.generateContent({
    model,
    contents: { parts: [{ text: prompt }] },
    config: { 
      imageConfig: { 
        aspectRatio: "3:4" 
      } 
    }
  });

  // Iterate through response parts to find the inline image data.
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return undefined;
};
