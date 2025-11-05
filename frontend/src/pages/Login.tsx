import React, { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export default function LoginPage(): JSX.Element {
  const API_BASE =
    ((import.meta as any).env?.VITE_API_URL as string) ||
    "http://localhost:4000";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Login failed");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      location.hash = "#/home";
    } catch (err: any) {
      setError(err?.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-center">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div className="app-title">HeyHost</div>
        <Card className="ui-card--narrow">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="ui-stack">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <div className="ui-row--between">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="ui-link-muted">
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {error ? (
                <div style={{ color: "#b91c1c", marginTop: 8 }}>{error}</div>
              ) : null}
            </CardContent>

            <CardFooter>
              <Button type="submit" className="ui-full" disabled={loading}>
                {loading ? "Loading…" : "Login"}
              </Button>
              <div className="ui-card__meta">
                Don't have an account?{" "}
                <a href="#/register" className="ui-card__meta-link">
                  Sign up
                </a>
              </div>
            </CardFooter>
          </form>
        </Card>
        <div className="app-subtitle">EST. 2025</div>
      </div>
    </div>
  );
}
