import express from "express";
import cors from "cors";
import { serve } from "inngest/express";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";
import { clerkMiddleware } from '@clerk/express'
import { protectRoute } from "./middleware/protectRoute.js";
import chatRoutes from "./routes/chatRoutes.js"
import sessionRoutes from "./routes/sessionRoutes.js"


const app = express();

// const allowedOrigins = ENV.CLIENT_URL.split(",");
const allowedOrigins = ENV.CLIENT_URL
  ? ENV.CLIENT_URL.split(",")
  : [];

//   console.log(allowedOrigins)

/* =====================
   Middleware
===================== */

// Trust proxy (important for Render / Vercel)
app.set("trust proxy", 1);

app.use(express.json());

app.use(cors({
    origin: allowedOrigins, // frontend URL
    credentials: true,      // allow cookies / auth headers
  })
);

app.use(clerkMiddleware); // this add auth field to request object : req.auth()

/* =====================
   Inngest Route
===================== */
app.use("/api/inngest",
  serve({
    client: inngest,
    functions,
  })
);

app.use("/api/chat" , chatRoutes)

app.use("/api/sessions" , sessionRoutes)




/* =====================
   Health Check
===================== */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running 🚀",
  });
});

app.get("/health" , (req,res)=>{
  
  res.status(200).json({msg:"api is up and running "});
})

/* =====================
   Start Server
===================== */
const PORT = ENV.PORT || process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error starting the server:", error);
    process.exit(1);
  }
};

startServer();
