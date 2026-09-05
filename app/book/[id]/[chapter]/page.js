import { supabase } from "@/lib/supabaseClient";
    import AdSlot from "@/app/components/AdSlot";
    import ReaderGuard from "@/app/components/ReaderGuard";

    export const revalidate = 60;

    export default async function ChapterPage({ params }) {
    const { id, chapter } = params;

    const { data: novel } = await supabase
      .from("novels")
      .select("id, title")
      .eq("id", id)
      .single();

    const { data: chapterData } = await supabase
      .from("chapters")
      .select("id, chapter_number, content")
      .eq("novel_id", id)
      .eq("chapter_number", chapter)
      .single();

    const { data: allChapters } = await supabase
      .from("chapters")
      .select("chapter_number")
      .eq("novel_id", id)
      .order("chapter_number", { ascending: true });

    if (!chapterData) {
      return <p>အခန်း ရှာမတွေ့ပါ။</p>;
    }

    const chapterNumbers = allChapters?.map((c) => c.chapter_number) || [];
    const currentIndex = chapterNumbers.indexOf(chapterData.chapter_number);
    const prevChapter = currentIndex > 0 ? chapterNumbers[currentIndex - 1] : null;
    const nextChapter = currentIndex >= 0 && currentIndex < chapterNumbers.length - 1 ? chapterNumbers[currentIndex + 1] : null;

    const paragraphs = (chapterData.content || "")
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);
    const midPoint = Math.floor(paragraphs.length * 0.4);

    return (
      <ReaderGuard>
        <div>
          <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 8 }}>
            <a href={"/book/" + id} style={{ color: "var(--muted)" }}>{novel?.title}</a>
          </div>
          <h1 style={{ fontSize: 22, marginBottom: 20 }}>အခန်း {chapterData.chapter_number}</h1>

          <AdSlot label="Top" />

          <div style={{ lineHeight: 2.05, fontSize: 17 }}>
            {paragraphs.map((paragraph, index) => (
              <div key={index}>
                <p style={chapterParagraphStyle}>{paragraph}</p>
                {index === midPoint && <AdSlot label="Middle" />}
              </div>
            ))}
          </div>

          <AdSlot label="Bottom" />

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 30, gap: 10 }}>
            {prevChapter ? <a href={"/book/" + id + "/" + prevChapter} style={navBtnStyle}>← အရင်အခန်း</a> : <span />}
            {nextChapter ? <a href={"/book/" + id + "/" + nextChapter} style={navBtnStyle}>နောက်အခန်း →</a> : <span />}
          </div>
        </div>
      </ReaderGuard>
    );
    }

    const chapterParagraphStyle = { margin: "0 0 23px", textIndent: "1.5em", lineHeight: 2.05, whiteSpace: "pre-wrap" };
    const navBtnStyle = { padding: "10px 16px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, textDecoration: "none", color: "var(--text)", fontSize: 14 };
    