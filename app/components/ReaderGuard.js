'use client';

    import { useEffect } from "react";

    const blockedKeys = new Set(["c", "x", "a", "s", "u", "p"]);

    export default function ReaderGuard({ children }) {
    useEffect(() => {
      function prevent(event) {
        event.preventDefault();
      }

      function preventKeyboardCopy(event) {
        if ((event.ctrlKey || event.metaKey) && blockedKeys.has(event.key.toLowerCase())) {
          event.preventDefault();
        }
      }

      document.addEventListener("contextmenu", prevent);
      document.addEventListener("copy", prevent);
      document.addEventListener("cut", prevent);
      document.addEventListener("selectstart", prevent);
      document.addEventListener("dragstart", prevent);
      document.addEventListener("keydown", preventKeyboardCopy);

      return () => {
        document.removeEventListener("contextmenu", prevent);
        document.removeEventListener("copy", prevent);
        document.removeEventListener("cut", prevent);
        document.removeEventListener("selectstart", prevent);
        document.removeEventListener("dragstart", prevent);
        document.removeEventListener("keydown", preventKeyboardCopy);
      };
    }, []);

    return <div className="reader-protected">{children}</div>;
    }
    