export type Theme = "light" | "dark";

const STORAGE_KEY = "heyhost_theme";

export function getStoredTheme(): Theme | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "dark" || v === "light") return v;
  } catch (e) {
    /* ignore */
  }
  return null;
}

export function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  if (theme === "dark") document.documentElement.classList.add("theme-dark");
  else document.documentElement.classList.remove("theme-dark");
}

export function setTheme(theme: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch (e) {
    /* ignore */
  }
  applyTheme(theme);
}

export function initTheme(defaultTheme: Theme = "light") {
  const stored = getStoredTheme();
  const theme = stored ?? defaultTheme;
  applyTheme(theme);
  return theme;
}
