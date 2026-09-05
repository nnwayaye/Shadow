'use client';

    import { useEffect, useState } from "react";

    export default function InstallAppButton() {
    const [installPrompt, setInstallPrompt] = useState(null);
    const [installed, setInstalled] = useState(false);

    useEffect(() => {
      function handleBeforeInstallPrompt(event) {
        event.preventDefault();
        setInstallPrompt(event);
      }

      function handleAppInstalled() {
        setInstalled(true);
        setInstallPrompt(null);
      }

      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.addEventListener("appinstalled", handleAppInstalled);
      return () => {
        window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        window.removeEventListener("appinstalled", handleAppInstalled);
      };
    }, []);

    async function installApp() {
      if (!installPrompt) {
        window.alert("Chrome Menu (⋮) ကိုနှိပ်ပြီး Add to Home screen သို့မဟုတ် Install app ကိုရွေးပါ။");
        return;
      }

      installPrompt.prompt();
      await installPrompt.userChoice;
      setInstallPrompt(null);
    }

    return (
      <button type="button" className="install-button" onClick={installApp} disabled={installed}>
        {installed ? "✓ App ထည့်ပြီး" : "App ထည့်မယ်"}
      </button>
    );
    }
    