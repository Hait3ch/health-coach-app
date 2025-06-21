import express from "express";
import cors from "cors";
import { connectToDatabase } from "./utils/mongodb";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health-checks", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const checks = await db.collection("healthChecks").find().toArray();
    res.json(checks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const PORT = 4000;
app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);
