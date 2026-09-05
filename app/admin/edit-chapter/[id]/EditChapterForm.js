'use client';

    import { useRouter } from "next/navigation";
    import { useState } from "react";

    export default function EditChapterForm({ chapter, novelTitle }) {
    const router = useRouter();
    const [form, setForm] = useState({
      chapter_number: String(chapter.chapter_number),
      content: chapter.content || "",
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    function updateField(field, value) {
      setForm((current) => ({ ...current, [field]: value }));
    }

    async function handleSubmit(event) {
      event.preventDefault();
      setErrorMsg("");
      setIsSaving(true);

      try {
        const response = await fetch("/api/admin/chapters/" + chapter.id, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(result.error || "အခန်းပြင်ရာတွင် အမှားရှိပါတယ်");
        router.push("/admin/dashboard");
        router.refresh();
      } catch (error) {
        setErrorMsg(error.message || "အခန်းပြင်ရာတွင် အမှားရှိပါတယ်");
        setIsSaving(false);
      }
    }

    return (
      <div>
        <h1 style={{ fontSize: 22, marginBottom: 8 }}>အခန်း ပြင်မယ်</h1>
        <p style={{ color: "#666", fontSize: 14, marginBottom: 20 }}>{novelTitle}</p>
        <form onSubmit={handleSubmit} style={formStyle}>
          <div>
            <label style={labelStyle}>အခန်းနံပါတ်</label>
            <input type="number" min="1" required value={form.chapter_number} onChange={(event) => updateField("chapter_number", event.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>အခန်းစာသား</label>
            <textarea rows={18} required value={form.content} onChange={(event) => updateField("content", event.target.value)} style={{ ...inputStyle, fontFamily: "inherit", lineHeight: 1.7 }} />
          </div>
          {errorMsg && <p style={errorStyle}>{errorMsg}</p>}
          <button type="submit" disabled={isSaving} style={{ ...buttonStyle, opacity: isSaving ? 0.65 : 1 }}>
            {isSaving ? "သိမ်းနေပါတယ်..." : "ပြင်ပြီး သိမ်းမယ်"}
          </button>
          <a href="/admin/dashboard" style={cancelStyle}>မလုပ်တော့ပါ</a>
        </form>
      </div>
    );
    }

    const formStyle = { display: "flex", flexDirection: "column", gap: 12 };
    const labelStyle = { display: "block", marginBottom: 4, fontSize: 14 };
    const inputStyle = { width: "100%", padding: 10, border: "1px solid #ccc", borderRadius: 6, boxSizing: "border-box", fontSize: 15 };
    const buttonStyle = { padding: 12, background: "#222", color: "#fff", border: "none", borderRadius: 6, fontSize: 15, cursor: "pointer" };
    const cancelStyle = { textAlign: "center", color: "#666", fontSize: 14, textDecoration: "none" };
    const errorStyle = { color: "#b42318", fontSize: 14, margin: 0 };
    