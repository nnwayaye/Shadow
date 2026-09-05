'use client';

    import { useEffect, useState } from "react";

    const STORAGE_KEY = "shadow-theme";

    export default function ThemeToggle() {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      const preferred = saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      setTheme(preferred);
      document.documentElement.dataset.theme = preferred;
    }, []);

    function toggleTheme() {
      const nextTheme = theme === "dark" ? "light" : "dark";
      setTheme(nextTheme);
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
      document.documentElement.dataset.theme = nextTheme;
    }

    return (
      <button
        type="button"
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={theme === "dark" ? "နေ့အရောင်ပြောင်းမယ်" : "ညအရောင်ပြောင်းမယ်"}
      >
        {theme === "dark" ? "☀️ Day" : "🌙 Night"}
      </button>
    );
    }
    