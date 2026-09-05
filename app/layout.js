import "./theme.css";
    import ThemeToggle from "./components/ThemeToggle";
    import InstallAppButton from "./components/InstallAppButton";
    import PwaRegister from "./components/PwaRegister";

    export const metadata = {
    title: "Shadow",
    description: "Shadow မှာ မြန်မာဝတ္ထုများကို ဖတ်ရှုပါ",
    manifest: "/manifest.webmanifest",
    icons: {
      icon: "/shadow-logo.png",
      apple: "/shadow-logo.png",
    },
    };

    export const viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#0d0e11",
    };

    export default function RootLayout({ children }) {
    return (
      <html lang="my" suppressHydrationWarning>
        <body style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>
          <PwaRegister />
          <header className="site-header">
            <a href="/" className="brand-link">
              <img src="/shadow-logo.png" alt="Shadow logo" className="brand-logo" />
              <span>Shadow</span>
            </a>
            <div className="header-actions">
              <InstallAppButton />
              <ThemeToggle />
            </div>
          </header>
          <main style={{ maxWidth: 800, margin: "0 auto", padding: "20px" }}>
            {children}
          </main>
        </body>
      </html>
    );
    }
    