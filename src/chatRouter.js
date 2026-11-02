import express from "express";
import GeminiProvider from "./geminiProvider.js";

const router = express.Router();

router.post("/chat", async (req, res) => {
    const { message } = req.body;

    if (!message || typeof message !== 'string' || message.trim() === "") {
        return res.status(400).json({ error: "Message must be a valid, non-empty text string." });
    }
    console.log("Valid message payload:", message);

    try {
        const gemini = new GeminiProvider(
            process.env.GEMINI_API_KEY,
            process.env.GEMINI_MODEL
        );

        const response = await gemini.generateResponse(message);
        res.json({ reply: response });

    } catch (error) {
        console.error("Error generating response from Gemini:", error);
        res.status(500).json({ error: error.message || "Error generating response from Gemini" });
    }
});

export default router;