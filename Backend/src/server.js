import express from "express";
import cors from "cors";
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";

import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";

const app = express();

/* =====================
   CORS CONFIG
===================== */

const allowedOrigins = ENV.CLIENT_URL
  ? ENV.CLIENT_URL.split(",").map(o => o.trim())
  : [];

/* =====================
   MIDDLEWARE
===================== */

app.use(express.json());

//  CORS (THIS HANDLES PREFLIGHT AUTOMATICALLY)
app.use(cors({
  origin: (origin, callback) => {
    // Allow server-to-server / Postman / Vercel internal
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.error("❌ Blocked by CORS:", origin);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

/* =====================
   AUTH
===================== */
app.use(clerkMiddleware());

/* =====================
   INNGEST
===================== */
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions,
  })
);

/* =====================
   ROUTES
===================== */
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);

/* =====================
   HEALTH
===================== */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running 🚀",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({ msg: "api is up and running" });
});

/* =====================
   DB INIT
===================== */
connectDB();

/* =====================
   EXPORT (Vercel)
===================== */
export default app;
