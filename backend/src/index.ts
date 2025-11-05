import "dotenv/config";
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import authRouter from "./routes/auth";

const app = express();
export const prisma = new PrismaClient();

// Validate required environment variables at startup so failures are visible in logs
const requiredEnvs = ["DATABASE_URL", "JWT_SECRET"];
const missing = requiredEnvs.filter((k) => !process.env[k]);
if (missing.length > 0) {
  console.error(
    `Missing required environment variables: ${missing.join(", ")}`
  );
  // Exit so Render shows a clear failed startup instead of obscure runtime 500s
  process.exit(1);
}

// Allow CORS for the frontend. In production the frontend is a static site and
// we don't use cookies for auth, so a permissive CORS policy is acceptable here.
// Use a specific FRONTEND_URL env var if you want to lock it down.
import { CorsOptions } from "cors";
const frontendOrigin = process.env.FRONTEND_URL || undefined;
const corsOptions: CorsOptions | undefined = frontendOrigin
  ? { origin: frontendOrigin, credentials: false }
  : undefined;
app.use(cors(corsOptions));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/auth", authRouter(prisma));

const port = Number(process.env.PORT || 4000);
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
