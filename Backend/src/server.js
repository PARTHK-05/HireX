import express from "express";
import cors from "cors";
import { serve } from "inngest/express";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";

const app = express();

/* =====================
   Middleware
===================== */

// Trust proxy (important for Render / Vercel)
app.set("trust proxy", 1);

app.use(express.json());

app.use(
  cors({
    origin: ENV.CLIENT_URL, // frontend URL
    credentials: true,      // allow cookies / auth headers
  })
);

/* =====================
   Inngest Route
===================== */
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions,
  })
);

/* =====================
   Health Check
===================== */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running 🚀",
  });
});

/* =====================
   Start Server
===================== */
const PORT = ENV.PORT || process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error starting the server:", error);
    process.exit(1);
  }
};

startServer();
