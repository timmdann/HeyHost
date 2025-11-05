import { Router } from "express";
import type { PrismaClient, Role } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { authMiddleware } from "../security/authMiddleware";

export default function authRouter(prisma: PrismaClient) {
  const router = Router();

  router.post("/register", async (req, res) => {
    try {
      const { email, password, name, role } = req.body ?? {};
      if (!email || !password)
        return res
          .status(400)
          .json({ error: "Email and password are required" });

      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing)
        return res.status(409).json({ error: "Email already in use" });

      const passwordHash = await bcrypt.hash(String(password), 10);
      const user = await prisma.user.create({
        data: {
          email,
          passwordHash,
          name: name ?? null,
          role: (role === "ADMIN" ? "ADMIN" : "USER") as Role,
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
        },
      });

      const token = jwt.sign(
        { sub: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
      );

      res.status(201).json({ user, token });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Registration failed" });
    }
  });

  router.post("/login", async (req, res) => {
    const { email, password } = req.body ?? {};
    if (!email || !password)
      return res.status(400).json({ error: "Email and password are required" });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(String(password), user.passwordHash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { sub: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
      },
      token,
    });
  });

  router.get("/me", authMiddleware, async (req: any, res) => {
    const userId = req.user?.sub as string;
    const me = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });
    res.json({ user: me });
  });

  return router;
}
