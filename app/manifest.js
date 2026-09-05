export default function manifest() {
    return {
      name: "Shadow",
      short_name: "Shadow",
      description: "Shadow မှာ မြန်မာဝတ္ထုများကို ဖတ်ရှုပါ",
      start_url: "/",
      display: "standalone",
      background_color: "#0d0e11",
      theme_color: "#0d0e11",
      orientation: "portrait",
      icons: [
        {
          src: "/shadow-logo.png",
          sizes: "1024x1024",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    };
    }
    