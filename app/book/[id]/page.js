import { supabase } from "@/lib/supabaseClient";

export const revalidate = 60;

export default async function NovelPage({ params }) {
  const { id } = params;

  const { data: novel } = await supabase
    .from("novels")
    .select("id, title, synopsis, status")
    .eq("id", id)
    .single();

  const { data: chapters } = await supabase
    .from("chapters")
    .select("id, chapter_number, title")
    .eq("novel_id", id)
    .order("chapter_number", { ascending: true });

  if (!novel) {
    return <p>ဝတ္ထု ရှာမတွေ့ပါ။</p>;
  }

  return (
    <div>
      <h1 style={{ fontSize: 24, marginBottom: 8 }}>{novel.title}</h1>
      <div style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>
        {novel.status === "completed" ? "✅ ပြီးပြီ" : "🔥 ဆက်လက်ရေးနေဆဲ"}
        {" · "}
        {chapters?.length || 0} ပိုင်း
      </div>
      <p style={{ lineHeight: 1.7, marginBottom: 24 }}>{novel.synopsis}</p>

      <h2 style={{ fontSize: 18, marginBottom: 12 }}>အခန်းများ</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {chapters && chapters.length > 0 ? (
          chapters.map((ch) => (
            <a
              key={ch.id}
              href={`/book/${novel.id}/${ch.chapter_number}`}
              style={{
                display: "block",
                padding: "12px 16px",
                background: "#fff",
                borderRadius: 8,
                textDecoration: "none",
                color: "#222",
                border: "1px solid #eee",
              }}
            >
              အခန်း {ch.chapter_number}
              {ch.title ? ` - ${ch.title}` : ""}
            </a>
          ))
        ) : (
          <p>အခန်း မတင်ရသေးပါ။</p>
        )}
      </div>
    </div>
  );
}
