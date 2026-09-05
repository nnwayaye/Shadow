    import { unstable_noStore as noStore } from "next/cache";
    import { supabaseAdmin } from "@/lib/supabaseAdmin";
    import AdminDeleteButton from "@/app/admin/dashboard/AdminDeleteButton";

    export const dynamic = "force-dynamic";

    export default async function AdminNovelChaptersPage({ params }) {
    noStore();
    const { data: novel, error: novelError } = await supabaseAdmin
      .from("novels")
      .select("id, title, synopsis, status")
      .eq("id", params.id)
      .maybeSingle();

    const { data: chapters, error: chaptersError } = await supabaseAdmin
      .from("chapters")
      .select("id, chapter_number")
      .eq("novel_id", params.id)
      .order("chapter_number", { ascending: true });

    if (novelError || chaptersError || !novel) {
      return <p style={{ color: "#b42318" }}>ဝတ္ထုစာမျက်နှာ ဖတ်ရာတွင် အမှားရှိပါတယ်။</p>;
    }

    return (
      <div>
        <a href="/admin/dashboard" style={backLinkStyle}>← Admin Dashboard</a>
        <h1 style={{ fontSize: 24, margin: "16px 0 8px" }}>{novel.title}</h1>
        <div style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>
          {novel.status === "completed" ? "✅ ပြီးပြီ" : "🔥 ရေးနေဆဲ"} · {chapters?.length || 0} ပိုင်း
        </div>
        {novel.synopsis && <p style={{ lineHeight: 1.7, marginBottom: 24 }}>{novel.synopsis}</p>}

        <div style={headingRowStyle}>
          <h2 style={{ fontSize: 18, margin: 0 }}>အခန်းများ</h2>
          <a href={"/admin/new-chapter?novel_id=" + novel.id} style={addChapterStyle}>+ အခန်းထည့်မယ်</a>
        </div>

        <div style={chapterListStyle}>
          {chapters && chapters.length > 0 ? (
            chapters.map((chapter) => (
              <div key={chapter.id} style={chapterRowStyle}>
                <a href={"/book/" + novel.id + "/" + chapter.chapter_number} style={chapterLinkStyle}>
                  အခန်း {chapter.chapter_number}
                </a>
                <div style={actionRowStyle}>
                  <a href={"/admin/edit-chapter/" + chapter.id} style={editLinkStyle}>ပြင်မယ်</a>
                  <AdminDeleteButton
                    endpoint={"/api/admin/chapters/" + chapter.id}
                    message={"အခန်း " + chapter.chapter_number + " ကို ဖျက်မှာ သေချာပါသလား?"}
                  />
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: "#777" }}>အခန်း မတင်ရသေးပါ။</p>
          )}
        </div>
      </div>
    );
    }

    const backLinkStyle = { color: "#666", fontSize: 13, textDecoration: "none" };
    const headingRowStyle = { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 12 };
    const addChapterStyle = { color: "#0070f3", fontSize: 13, textDecoration: "none", whiteSpace: "nowrap" };
    const chapterListStyle = { display: "flex", flexDirection: "column", gap: 8 };
    const chapterRowStyle = { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, padding: "13px 14px", background: "#fff", border: "1px solid #eee", borderRadius: 8 };
    const chapterLinkStyle = { color: "#222", textDecoration: "none", fontSize: 15 };
    const actionRowStyle = { display: "flex", alignItems: "center", gap: 10, flexShrink: 0 };
    const editLinkStyle = { color: "#0070f3", fontSize: 13, textDecoration: "none" };
    