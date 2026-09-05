import { supabaseAdmin } from "@/lib/supabaseAdmin";
    import AdminDeleteButton from "./AdminDeleteButton";

    export const dynamic = "force-dynamic";

    export default async function DashboardPage() {
    const [{ data: novels, error }, { data: chapters, error: chaptersError }] = await Promise.all([
      supabaseAdmin.from("novels").select("id, title, status, synopsis"),
      supabaseAdmin.from("chapters").select("id, novel_id, chapter_number"),
    ]);

    if (error || chaptersError) {
      return <p style={{ color: "#b42318" }}>Database error: {(error || chaptersError).message}</p>;
    }

    const chaptersByNovel = (chapters || []).reduce((groups, chapter) => {
      if (!groups[chapter.novel_id]) groups[chapter.novel_id] = [];
      groups[chapter.novel_id].push(chapter);
      return groups;
    }, {});

    Object.values(chaptersByNovel).forEach((items) => {
      items.sort((a, b) => a.chapter_number - b.chapter_number);
    });

    return (
      <div>
        <h1 style={{ fontSize: 22, marginBottom: 20 }}>Admin Dashboard</h1>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
          <a href="/admin/new-novel" style={primaryButtonStyle}>
            + ဝတ္ထုအသစ် တင်မယ်
          </a>
          <a href="/api/admin/backup" style={backupButtonStyle}>
            Backup ဒေါင်းမယ်
          </a>
        </div>

        <p style={{ fontSize: 13, color: "#666", marginTop: -12, marginBottom: 20 }}>
          Backup ဖိုင်ကို ဖုန်းထဲ download လုပ်ပြီး သိမ်းထားပါ။
        </p>

        <h2 style={{ fontSize: 18, marginBottom: 12 }}>ဝတ္ထုများ</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {novels && novels.length > 0 ? (
            novels.map((novel) => {
              const novelChapters = chaptersByNovel[novel.id] || [];
              return (
                <div key={novel.id} style={novelCardStyle}>
                  <div style={novelHeaderStyle}>
                    <div>
                      <div style={{ fontWeight: 700 }}>{novel.title}</div>
                      <div style={{ fontSize: 12, color: "#888" }}>
                        {novel.status === "completed" ? "✅ ပြီးပြီ" : "🔥 ရေးနေဆဲ"} · {novelChapters.length} ပိုင်း
                      </div>
                    </div>
                    <div style={actionRowStyle}>
                      <a href={"/admin/edit-novel/" + novel.id} style={editLinkStyle}>ပြင်မယ်</a>
                      <AdminDeleteButton
                        endpoint={"/api/admin/novels/" + novel.id}
                        message={"ဒီဝတ္ထုနဲ့ အခန်း " + novelChapters.length + " ပိုင်းလုံးကို ဖျက်မှာ သေချာပါသလား?"}
                      />
                    </div>
                  </div>

                  <a href={"/admin/new-chapter?novel_id=" + novel.id} style={addChapterLinkStyle}>
                    + အခန်းထည့်မယ်
                  </a>

                  {novelChapters.length > 0 && (
                    <div style={chapterListStyle}>
                      {novelChapters.map((chapter) => (
                        <div key={chapter.id} style={chapterRowStyle}>
                          <span>အခန်း {chapter.chapter_number}</span>
                          <div style={actionRowStyle}>
                            <a href={"/admin/edit-chapter/" + chapter.id} style={editLinkStyle}>ပြင်မယ်</a>
                            <AdminDeleteButton
                              endpoint={"/api/admin/chapters/" + chapter.id}
                              message={"အခန်း " + chapter.chapter_number + " ကို ဖျက်မှာ သေချာပါသလား?"}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p>ဝတ္ထု မရှိသေးပါ။</p>
          )}
        </div>
      </div>
    );
    }

    const primaryButtonStyle = {
    display: "inline-block",
    padding: "10px 16px",
    background: "#222",
    color: "#fff",
    borderRadius: 6,
    textDecoration: "none",
    };

    const backupButtonStyle = {
    display: "inline-block",
    padding: "10px 16px",
    background: "#eef6ff",
    color: "#075985",
    border: "1px solid #bfdbfe",
    borderRadius: 6,
    textDecoration: "none",
    };

    const novelCardStyle = {
    padding: 14,
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: 8,
    };

    const novelHeaderStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    };

    const actionRowStyle = {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
    };

    const editLinkStyle = {
    color: "#0070f3",
    fontSize: 13,
    textDecoration: "none",
    };

    const addChapterLinkStyle = {
    display: "inline-block",
    marginTop: 12,
    color: "#0070f3",
    fontSize: 13,
    textDecoration: "none",
    };

    const chapterListStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    marginTop: 12,
    paddingTop: 10,
    borderTop: "1px solid #eee",
    };

    const chapterRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    padding: "7px 0",
    fontSize: 13,
    };
    