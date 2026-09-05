import { supabaseAdmin } from "@/lib/supabaseAdmin";
    import AdminDeleteButton from "./AdminDeleteButton";

    export const dynamic = "force-dynamic";

    export default async function DashboardPage() {
    const [{ data: novels, error }, { data: chapters, error: chaptersError }] = await Promise.all([
      supabaseAdmin.from("novels").select("id, title, status"),
      supabaseAdmin.from("chapters").select("id, novel_id, chapter_number"),
    ]);

    if (error || chaptersError) {
      return <p style={{ color: "#b42318" }}>Database error: {(error || chaptersError).message}</p>;
    }

    const chapterCounts = (chapters || []).reduce((counts, chapter) => {
      counts[chapter.novel_id] = (counts[chapter.novel_id] || 0) + 1;
      return counts;
    }, {});

    return (
      <div>
        <h1 style={{ fontSize: 22, marginBottom: 20 }}>Admin Dashboard</h1>

        <a href="/admin/new-novel" style={primaryButtonStyle}>
          + ဝတ္ထုအသစ် တင်မယ်
        </a>

        <h2 style={{ fontSize: 18, margin: "28px 0 12px" }}>ဝတ္ထုများ</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {novels && novels.length > 0 ? (
            novels.map((novel) => {
              const chapterCount = chapterCounts[novel.id] || 0;
              return (
                <div key={novel.id} style={novelCardStyle}>
                  <div style={novelHeaderStyle}>
                    <div>
                      <a href={"/admin/novel/" + novel.id} style={novelTitleStyle}>
                        {novel.title}
                      </a>
                      <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>
                        {novel.status === "completed" ? "✅ ပြီးပြီ" : "🔥 ရေးနေဆဲ"} · {chapterCount} ပိုင်း
                      </div>
                    </div>
                    <div style={actionRowStyle}>
                      <a href={"/admin/edit-novel/" + novel.id} style={editLinkStyle}>ပြင်မယ်</a>
                      <AdminDeleteButton
                        endpoint={"/api/admin/novels/" + novel.id}
                        message="ဒီဝတ္ထုကို ဖျက်မှာ သေချာပါသလား?"
                        disabled={chapterCount > 0}
                        disabledReason="အခန်းများရှိသေးလို့ အရင်ဖျက်ပါ"
                      />
                    </div>
                  </div>
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

    const novelTitleStyle = {
    color: "#222",
    fontWeight: 700,
    fontSize: 18,
    textDecoration: "none",
    };

    const actionRowStyle = {
    display: "flex",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: 8,
    };

    const editLinkStyle = {
    color: "#0070f3",
    fontSize: 13,
    textDecoration: "none",
    };
    