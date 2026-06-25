import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { getProductInsights, scoutWinningProducts } from "./lib/gemini";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.post("/api/product-insights", async (req, res) => {
    try {
      const { productName } = req.body;
      if (!productName) {
        return res.status(400).json({ error: "Product name is required" });
      }
      const result = await getProductInsights(productName);
      res.json({ result });
    } catch (error: any) {
      console.error("Express /api/product-insights error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/scout-winning-products", async (req, res) => {
    try {
      const { niche, minDemand, minMargin, maxCompetition, wowFactorWeight } = req.body;
      if (!niche) {
        return res.status(400).json({ error: "Niche is required" });
      }
      const result = await scoutWinningProducts({
        niche,
        minDemand: Number(minDemand || 70),
        minMargin: Number(minMargin || 20),
        maxCompetition: Number(maxCompetition || 40),
        wowFactorWeight: Number(wowFactorWeight || 80),
      });
      res.json(result);
    } catch (error: any) {
      console.error("Express /api/scout-winning-products error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
