import React, { useEffect, useState } from "react";
import { initTheme, setTheme } from "../theme";

export const ThemeToggle: React.FC = () => {
  const [theme, setLocal] = useState<"light" | "dark">(() =>
    initTheme("light")
  );

  useEffect(() => {
    // ensure document has correct class on mount
    setTheme(theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setLocal(next);
    setTheme(next);
  };

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggle}
      style={{
        position: "fixed",
        right: 16,
        top: 16,
        zIndex: 60,
        borderRadius: 8,
        padding: "6px 10px",
        background: "transparent",
        border: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
};

export default ThemeToggle;
