import "dotenv/config";
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import authRouter from "./routes/auth";

const app = express();
export const prisma = new PrismaClient();

// Allow CORS for the frontend. In production the frontend is a static site and
// we don't use cookies for auth, so a permissive CORS policy is acceptable here.
// Use a specific FRONTEND_URL env var if you want to lock it down.
import { CorsOptions } from "cors";
const frontendOrigin = process.env.FRONTEND_URL || undefined;
const corsOptions: CorsOptions | undefined = frontendOrigin
  ? { origin: frontendOrigin, credentials: false }
  : undefined;
app.use(cors(corsOptions));
// Ensure preflight OPTIONS requests are handled for all routes
app.options("*", cors(corsOptions));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/auth", authRouter(prisma));

const port = Number(process.env.PORT || 4000);
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
