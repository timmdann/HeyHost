import React, { useEffect, useState } from "react";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import HomePage from "./pages/Home";
import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  const [route, setRoute] = useState(() => location.hash || "#/");

  useEffect(() => {
    const onHash = () => setRoute(location.hash || "#/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  let Page = LoginPage;
  if (route === "#/register") Page = RegisterPage;
  if (route === "#/home") Page = HomePage;

  return (
    <>
      <ThemeToggle />
      <Page />
    </>
  );
}
