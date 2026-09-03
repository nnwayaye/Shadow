import { supabase } from "@/lib/supabaseClient";

export const revalidate = 60;

export default async function HomePage() {
  const { data: novels, error } = await supabase
    .from("novels")
    .select("id, title, synopsis, status")
    .order("created_at", { ascending: false });

  if (error) {
    return <p>ဝတ္ထုစာရင်း load လုပ်ရာတွင် အမှားရှိပါသည်: {error.message}</p>;
  }

  if (!novels || novels.length === 0) {
    return <p>ဝတ္ထု မရှိသေးပါ။ Admin Panel ကနေ ဝတ္ထုအသစ် တင်ပါ။</p>;
  }

  return (
    <div>
      <h1 style={{ fontSize: 24, marginBottom: 20 }}>ဝတ္ထုများ</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {novels.map((novel) => (
          <a
            key={novel.id}
            href={`/book/${novel.id}`}
            style={{
              display: "block",
              padding: 16,
              background: "#fff",
              borderRadius: 10,
              textDecoration: "none",
              color: "#222",
              border: "1px solid #eee",
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 700 }}>{novel.title}</div>
            <div style={{ fontSize: 13, color: "#888", marginTop: 4 }}>
              {novel.status === "completed" ? "✅ ပြီးပြီ" : "🔥 ဆက်လက်ရေးနေဆဲ"}
            </div>
            <p style={{ fontSize: 14, color: "#555", marginTop: 8 }}>
              {novel.synopsis?.slice(0, 120)}
              {novel.synopsis?.length > 120 ? "..." : ""}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
