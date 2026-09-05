import { supabase } from "@/lib/supabaseClient";
    import ReaderGuard from "@/app/components/ReaderGuard";
    import NovelTabs from "./NovelTabs";

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
      .select("id, chapter_number")
      .eq("novel_id", id)
      .order("chapter_number", { ascending: true });

    if (!novel) {
      return <p>ဝတ္ထု ရှာမတွေ့ပါ။</p>;
    }

    return (
      <ReaderGuard>
        <div>
          <div style={novelHeroStyle}>
            <h1 style={{ fontSize: 26, margin: 0, textAlign: "center" }}>{novel.title}</h1>
            <div style={badgeRowStyle}>
              <span style={statusBadgeStyle}>
                {novel.status === "completed" ? "✅ ပြီးပြီ" : "🔥 ဆက်လက်ရေးနေဆဲ"}
              </span>
              <span style={countBadgeStyle}>{chapters?.length || 0} ပိုင်း</span>
            </div>
          </div>
          <NovelTabs novelId={novel.id} synopsis={novel.synopsis} chapters={chapters || []} />
        </div>
      </ReaderGuard>
    );
    }

    const novelHeroStyle = {
    padding: "22px 16px",
    background: "var(--card-surface)",
    border: "1px solid var(--card-border)",
    borderRadius: 16,
    boxShadow: "0 4px 14px rgba(44, 91, 135, 0.08)",
    };

    const badgeRowStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 14,
    };

    const statusBadgeStyle = {
    display: "inline-flex",
    alignItems: "center",
    padding: "6px 11px",
    borderRadius: 999,
    background: "var(--surface)",
    border: "1px solid var(--card-border)",
    color: "var(--muted)",
    fontSize: 13,
    };

    const countBadgeStyle = {
    display: "inline-flex",
    alignItems: "center",
    padding: "6px 11px",
    borderRadius: 999,
    background: "var(--accent-soft)",
    border: "1px solid var(--accent)",
    color: "var(--accent)",
    fontSize: 13,
    fontWeight: 700,
    };
    