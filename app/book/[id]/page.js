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
          <h1 style={{ fontSize: 26, margin: "4px 0 8px", textAlign: "center" }}>{novel.title}</h1>
          <div style={{ fontSize: 13, color: "var(--muted)", textAlign: "center" }}>
            {novel.status === "completed" ? "✅ ပြီးပြီ" : "🔥 ဆက်လက်ရေးနေဆဲ"}
            {" · "}
            {chapters?.length || 0} ပိုင်း
          </div>
          <NovelTabs novelId={novel.id} synopsis={novel.synopsis} chapters={chapters || []} />
        </div>
      </ReaderGuard>
    );
    }
    