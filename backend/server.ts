import express from "express";
import cors from "cors";
import { connectToDatabase } from "./utils/mongodb";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health-checks", async (req, res) => {
    try {
      const userId = req.query.userId;
      if (!userId) {
        return res.status(400).json({ error: "Missing userId" });
      }
      const db = await connectToDatabase();
      const checks = await db
        .collection("healthChecks")
        .find({ userId: userId.toString() }) 
        .toArray();
  
      res.json(checks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  });
  

app.post("/health-checks", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const healthCheckData = req.body;

    const result = await db
      .collection("healthChecks")
      .insertOne(healthCheckData);

    res
      .status(201)
      .json({ message: "Health check saved", insertedId: result.insertedId });
  } catch (error) {
    console.error("Error saving health check:", error);
    res.status(500).json({ error: "Failed to save health check" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);
