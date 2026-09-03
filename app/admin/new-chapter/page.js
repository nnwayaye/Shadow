import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { redirect } from "next/navigation";

async function createChapter(formData) {
  "use server";

  const novel_id = formData.get("novel_id");
  const chapter_number = formData.get("chapter_number");
  const title = formData.get("title");
  const content = formData.get("content");

  await supabaseAdmin.from("chapters").insert({
    novel_id,
    chapter_number: parseInt(chapter_number, 10),
    title,
    content,
  });

  redirect("/admin/dashboard");
}

export default async function NewChapterPage({ searchParams }) {
  const { novel_id } = searchParams;

  const { data: novels } = await supabaseAdmin
    .from("novels")
    .select("id, title")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 style={{ fontSize: 22, marginBottom: 20 }}>အခန်းအသစ် ထည့်မယ်</h1>
      <form action={createChapter} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div>
          <label style={labelStyle}>ဝတ္ထု ရွေးပါ</label>
          <select name="novel_id" required style={inputStyle} defaultValue={novel_id || ""}>
            <option value="" disabled>
              -- ရွေးပါ --
            </option>
            {novels?.map((n) => (
              <option key={n.id} value={n.id}>
                {n.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label style={labelStyle}>အခန်းနံပါတ် (ဥပမာ 1, 2, 3)</label>
          <input name="chapter_number" type="number" required style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Chapter ခေါင်းစဉ် (optional)</label>
          <input name="title" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>အခန်းစာသား</label>
          <textarea
            name="content"
            rows={16}
            required
            style={{ ...inputStyle, fontFamily: "inherit", lineHeight: 1.7 }}
            placeholder="Paragraph တစ်ခုချင်းစီကို Enter နှစ်ချက်နှိပ်ပြီး ခွဲရေးပါ"
          />
        </div>
        <button type="submit" style={btnStyle}>
          ထည့်မည်
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
