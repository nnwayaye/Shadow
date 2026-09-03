export const metadata = {
  title: "My Novel Site",
  description: "မြန်မာဘာသာပြန် / ကိုယ်ရေးဝတ္ထုများ ဖတ်ရှုနိုင်တဲ့ site",
};

export default function RootLayout({ children }) {
  return (
    <html lang="my">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, sans-serif",
          background: "#faf9f6",
          color: "#222",
        }}
      >
        <header
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid #eee",
            background: "#fff",
          }}
        >
          <a
            href="/"
            style={{
              fontSize: 20,
              fontWeight: 700,
              textDecoration: "none",
              color: "#222",
            }}
          >
            📚 My Novel Site
          </a>
        </header>
        <main style={{ maxWidth: 800, margin: "0 auto", padding: "20px" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
