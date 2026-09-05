import { supabase } from "@/lib/supabaseClient";
    import ReaderGuard from "@/app/components/ReaderGuard";

    export const revalidate = 60;

    export default async function HomePage() {
    const [{ data: novels, error }, { data: chapters }] = await Promise.all([
      supabase.from("novels").select("id, title, status"),
      supabase.from("chapters").select("novel_id"),
    ]);

    if (error) {
      return <p>ဝတ္ထုစာရင်း load လုပ်ရာတွင် အမှားရှိပါသည်: {error.message}</p>;
    }

    if (!novels || novels.length === 0) {
      return <p>ဝတ္ထု မရှိသေးပါ။ Admin Panel ကနေ ဝတ္ထုအသစ် တင်ပါ။</p>;
    }

    const chapterCounts = (chapters || []).reduce((counts, chapter) => {
      counts[chapter.novel_id] = (counts[chapter.novel_id] || 0) + 1;
      return counts;
    }, {});

    return (
      <ReaderGuard>
        <div>
          <h1 style={{ fontSize: 24, marginBottom: 20 }}>ဝတ္ထုများ</h1>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {novels.map((novel) => (
              <a
                key={novel.id}
                href={"/book/" + novel.id}
                style={{
                  display: "block",
                  padding: 16,
                  background: "var(--surface)",
                  borderRadius: 10,
                  textDecoration: "none",
                  color: "var(--text)",
                  border: "1px solid var(--border)",
                }}
              >
                <div style={{ fontSize: 19, fontWeight: 700, textAlign: "center" }}>{novel.title}</div>
                <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 8, textAlign: "center" }}>
                  {novel.status === "completed" ? "✅ ပြီးပြီ" : "🔥 ဆက်လက်ရေးနေဆဲ"}
                  {" · "}
                  {chapterCounts[novel.id] || 0} ပိုင်း
                </div>
              </a>
            ))}
          </div>
        </div>
      </ReaderGuard>
    );
    }
    