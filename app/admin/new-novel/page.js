import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { redirect } from "next/navigation";

async function createNovel(formData) {
  "use server";

  const title = formData.get("title");
  const synopsis = formData.get("synopsis");
  const status = formData.get("status");

  await supabaseAdmin.from("novels").insert({ title, synopsis, status });

  redirect("/admin/dashboard");
}

export default function NewNovelPage() {
  return (
    <div>
      <h1 style={{ fontSize: 22, marginBottom: 20 }}>ဝတ္ထုအသစ် တင်မယ်</h1>
      <form action={createNovel} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div>
          <label style={labelStyle}>ဝတ္ထုခေါင်းစဉ်</label>
          <input name="title" required style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>အကျဉ်းချုပ်</label>
          <textarea name="synopsis" rows={5} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Status</label>
          <select name="status" style={inputStyle} defaultValue="ongoing">
            <option value="ongoing">ရေးနေဆဲ (ongoing)</option>
            <option value="completed">ပြီးပြီ (completed)</option>
          </select>
        </div>
        <button type="submit" style={btnStyle}>
          တင်မည်
        </button>
      </form>
    </div>
  );
}

const labelStyle = { display: "block", marginBottom: 4, fontSize: 14 };
const inputStyle = {
  width: "100%",
  padding: 10,
  border: "1px solid #ccc",
  borderRadius: 6,
  boxSizing: "border-box",
  fontSize: 15,
};
const btnStyle = {
  padding: 12,
  background: "#222",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  fontSize: 15,
};
