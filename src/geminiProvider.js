import { GoogleGenAI } from "@google/genai";

class GeminiProvider {
    constructor(apiKey, modelName) {
        this.apiKey = apiKey;
        this.modelName = modelName;

        if (!apiKey) {
            throw new Error("Api key is required");
        }
        if (!modelName) {
            throw new Error("Model Name is required");
        }
    }

    async generateResponse(prompt) {
        try {
            const ai = new GoogleGenAI({ apiKey: this.apiKey });
            const response = await ai.models.generateContent({
                model: this.modelName,
                contents: prompt,
            });
            console.log(response);
            return response.text;
        } catch (error) {
            throw new Error(`Error generating response: ${error.message}`);
        }
    }
}

export default GeminiProvider;
