import { GoogleGenAI, Type } from "@google/genai";
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

export async function getProductInsights(productName: string) {
  try {
    const prompt = `Perform a deep market analysis for the following dropshipping product: "${productName}". 
    Include:
    1. Target Audience Demographics
    2. Potential Profit Margins (Estimated)
    3. Marketing Strategy (TikTok, Meta, Google Ads)
    4. Competitive Landscape
    5. Long-term Scalability.
    
    Provide a highly professional, markdown-formatted, data-driven report. Use bold titles, lists, and clear structured sections.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Product Insights Error:", error);
    return "Error generating analysis. Please verify your Gemini API key in Settings > Secrets.";
  }
}

export interface ProductCriteria {
  niche: string;
  minDemand: number; // 1-100
  minMargin: number; // USD profit
  maxCompetition: number; // 1-100
  wowFactorWeight: number; // 1-100
}

export async function scoutWinningProducts(criteria: ProductCriteria) {
  try {
    const prompt = `As an elite AI dropshipping research bot, discover and analyze 3 high-potential 'winning' products in the "${criteria.niche}" niche that satisfy the following strict criteria:
    - High Market Demand (Min Score: ${criteria.minDemand}/100)
    - Excellent Profit Margins (Seeking average markup with at least $${criteria.minMargin} margin)
    - Low to Moderate Competition (Max Saturation Level: ${criteria.maxCompetition}/100)
    - Highlight high wow-factor, high-perceived value, or problem-solving traits.

    For each product, generate a detailed scorecard, estimated prices, competitive signals, marketing strategies, and automated scaling instructions.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            products: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  description: { type: Type.STRING },
                  niche: { type: Type.STRING },
                  sourcingCost: { type: Type.NUMBER, description: "Supplier cost in USD" },
                  targetPrice: { type: Type.NUMBER, description: "Suggested selling price in USD" },
                  demandScore: { type: Type.INTEGER, description: "Demand score out of 100" },
                  competitionScore: { type: Type.INTEGER, description: "Competition/saturation level out of 100" },
                  marginScore: { type: Type.INTEGER, description: "Margin profitability out of 100" },
                  wowFactorScore: { type: Type.INTEGER, description: "Wow factor/problem solver out of 100" },
                  overallScore: { type: Type.INTEGER, description: "Weighted fit score out of 100" },
                  whyWinning: { type: Type.STRING, description: "Why this product fits the criteria perfectly" },
                  winningSignals: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "3-4 direct indicators (e.g. TikTok hashtag views, AliExpress order spikes)"
                  },
                  marketingStrategy: { type: Type.STRING, description: "Viral marketing angle and ad creative advice" },
                  suggestedTools: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Best specialized tools to track this specific item (e.g. AdSpy, Google Trends, ImportYeti)"
                  },
                  automationMethod: { type: Type.STRING, description: "Step-by-step method/methodology to auto-find, track, or auto-source this item" }
                },
                required: [
                  "name", "description", "niche", "sourcingCost", "targetPrice", 
                  "demandScore", "competitionScore", "marginScore", "wowFactorScore", 
                  "overallScore", "whyWinning", "winningSignals", "marketingStrategy", 
                  "suggestedTools", "automationMethod"
                ]
              }
            }
          },
          required: ["products"]
        }
      }
    });

    if (!response.text) {
      throw new Error("Empty response from Gemini model");
    }

    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Gemini Scout Error:", error);
    throw error;
  }
}
