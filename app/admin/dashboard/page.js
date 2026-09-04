import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { data: novels, error } = await supabaseAdmin
    .from("novels")
    .select("id, title, status");

  if (error) {
    return <p style={{ color: "#b42318" }}>Database error: {error.message}</p>;
  }

  return (
    <div>
      <h1 style={{ fontSize: 22, marginBottom: 20 }}>Admin Dashboard</h1>

      <a
        href="/admin/new-novel"
        style={{
          display: "inline-block",
          padding: "10px 16px",
          background: "#222",
          color: "#fff",
          borderRadius: 6,
          textDecoration: "none",
          marginBottom: 24,
        }}
      >
        + ဝတ္ထုအသစ် တင်မယ်
      </a>

      <h2 style={{ fontSize: 18, marginBottom: 12 }}>ဝတ္ထုများ</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {novels && novels.length > 0 ? (
          novels.map((novel) => (
            <div
              key={novel.id}
              style={{
                padding: 14,
                background: "#fff",
                border: "1px solid #eee",
                borderRadius: 8,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontWeight: 700 }}>{novel.title}</div>
                <div style={{ fontSize: 12, color: "#888" }}>
                  {novel.status === "completed" ? "✅ ပြီးပြီ" : "🔥 ရေးနေဆဲ"}
                </div>
              </div>
              <a
                href={`/admin/new-chapter?novel_id=${novel.id}`}
                style={{
                  fontSize: 13,
                  color: "#0070f3",
                  textDecoration: "none",
                }}
              >
                + အခန်းထည့်မယ်
              </a>
            </div>
          ))
        ) : (
          <p>ဝတ္ထု မရှိသေးပါ။</p>
        )}
      </div>
    </div>
  );
}
