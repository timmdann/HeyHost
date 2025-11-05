import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";

export default function HomePage() {
  const API_BASE =
    ((import.meta as any).env?.VITE_API_URL as string) ||
    "http://localhost:4000";
  const [user, setUser] = useState<{
    name?: string | null;
    email?: string | null;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      location.hash = "#/";
      return;
    }

    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/auth/me`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          location.hash = "#/";
          return;
        }
        const data = await res.json();
        setUser(data?.user ?? null);
      } catch (e) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        location.hash = "#/";
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    location.hash = "#/";
  }

  return (
    <div className="page-center">
      <div style={{ textAlign: "center" }}>
        {loading ? (
          <p style={{ color: "var(--muted-text)" }}>Checking session…</p>
        ) : (
          <>
            <h1
              style={{
                fontFamily: "var(--font-main)",
                fontSize: 40,
                margin: 0,
              }}
            >
              Hello
              {user?.name
                ? `, ${user.name}`
                : user?.email
                ? `, ${user.email}`
                : ""}
            </h1>
            <p style={{ marginTop: 12, color: "var(--muted-text)" }}>
              Welcome to HeyHost
            </p>
            <div style={{ marginTop: 18 }}>
              <Button type="submit" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
