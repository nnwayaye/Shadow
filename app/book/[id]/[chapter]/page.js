import { supabase } from "@/lib/supabaseClient";
import AdSlot from "@/app/components/AdSlot";

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
    .select("id, chapter_number, title, content")
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
  const nextChapter =
    currentIndex >= 0 && currentIndex < chapterNumbers.length - 1
      ? chapterNumbers[currentIndex + 1]
      : null;

  const paragraphs = (chapterData.content || "")
    .split("\n")
    .filter((p) => p.trim() !== "");

  const midPoint = Math.floor(paragraphs.length * 0.4);

  return (
    <div>
      <div style={{ fontSize: 13, color: "#888", marginBottom: 8 }}>
        <a href={`/book/${id}`} style={{ color: "#888" }}>
          {novel?.title}
        </a>
      </div>
      <h1 style={{ fontSize: 22, marginBottom: 20 }}>
        အခန်း {chapterData.chapter_number}
        {chapterData.title ? ` - ${chapterData.title}` : ""}
      </h1>

      <AdSlot label="Top" />

      <div style={{ lineHeight: 1.9, fontSize: 17 }}>
        {paragraphs.map((para, i) => (
          <div key={i}>
            <p style={{ marginBottom: 16 }}>{para}</p>
            {i === midPoint && <AdSlot label="Middle" />}
          </div>
        ))}
      </div>

      <AdSlot label="Bottom" />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 30,
          gap: 10,
        }}
      >
        {prevChapter ? (
          <a href={`/book/${id}/${prevChapter}`} style={navBtnStyle}>
            ← အရင်အခန်း
          </a>
        ) : (
          <span />
        )}
        {nextChapter ? (
          <a href={`/book/${id}/${nextChapter}`} style={navBtnStyle}>
            နောက်အခန်း →
          </a>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}

const navBtnStyle = {
  padding: "10px 16px",
  background: "#fff",
  border: "1px solid #ddd",
  borderRadius: 8,
  textDecoration: "none",
  color: "#222",
  fontSize: 14,
};
