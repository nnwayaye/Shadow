'use client';

    import { useRouter } from "next/navigation";
    import { useState } from "react";

    export default function EditNovelForm({ novel }) {
    const router = useRouter();
    const [form, setForm] = useState({
      title: novel.title || "",
      synopsis: novel.synopsis || "",
      status: novel.status || "ongoing",
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
        const response = await fetch("/api/admin/novels/" + novel.id, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(result.error || "ဝတ္ထုပြင်ရာတွင် အမှားရှိပါတယ်");
        router.push("/admin/dashboard");
        router.refresh();
      } catch (error) {
        setErrorMsg(error.message || "ဝတ္ထုပြင်ရာတွင် အမှားရှိပါတယ်");
        setIsSaving(false);
      }
    }

    return (
      <div>
        <h1 style={{ fontSize: 22, marginBottom: 20 }}>ဝတ္ထု ပြင်မယ်</h1>
        <form onSubmit={handleSubmit} style={formStyle}>
          <div>
            <label style={labelStyle}>ဝတ္ထုခေါင်းစဉ်</label>
            <input required value={form.title} onChange={(event) => updateField("title", event.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>အကျဉ်းချုပ်</label>
            <textarea rows={5} value={form.synopsis} onChange={(event) => updateField("synopsis", event.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Status</label>
            <select value={form.status} onChange={(event) => updateField("status", event.target.value)} style={inputStyle}>
              <option value="ongoing">ရေးနေဆဲ (ongoing)</option>
              <option value="completed">ပြီးပြီ (completed)</option>
            </select>
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
    