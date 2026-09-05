'use client';

    import { useState } from "react";

    export default function NewChapterForm({ novels, initialNovelId }) {
    const [form, setForm] = useState({
      novel_id: initialNovelId,
      chapter_number: "",
      content: "",
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
        const response = await fetch("/api/admin/chapters", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(result.error || "အခန်းထည့်ရာတွင် အမှားရှိပါတယ်");
        }

        window.location.assign("/admin/novel/" + form.novel_id);
      } catch (error) {
        setErrorMsg(error.message || "အခန်းထည့်ရာတွင် အမှားရှိပါတယ်");
        setIsSaving(false);
      }
    }

    return (
      <div>
        <h1 style={{ fontSize: 22, marginBottom: 20 }}>အခန်းအသစ် ထည့်မယ်</h1>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <label style={labelStyle}>ဝတ္ထု ရွေးပါ</label>
            <select
              name="novel_id"
              required
              value={form.novel_id}
              onChange={(event) => updateField("novel_id", event.target.value)}
              style={inputStyle}
            >
              <option value="" disabled>-- ရွေးပါ --</option>
              {novels.map((novel) => <option key={novel.id} value={novel.id}>{novel.title}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>အခန်းနံပါတ် (ဥပမာ 1, 2, 3)</label>
            <input
              name="chapter_number"
              type="number"
              min="1"
              required
              value={form.chapter_number}
              onChange={(event) => updateField("chapter_number", event.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>အခန်းစာသား</label>
            <textarea
              name="content"
              rows={16}
              required
              value={form.content}
              onChange={(event) => updateField("content", event.target.value)}
              style={{ ...inputStyle, fontFamily: "inherit", lineHeight: 1.7 }}
              placeholder="Paragraph တစ်ခုချင်းစီကို Enter တစ်ချက်နှိပ်ပြီး ခွဲရေးပါ"
            />
          </div>
          {errorMsg && <p style={errorStyle}>{errorMsg}</p>}
          <button type="submit" disabled={isSaving || novels.length === 0} style={{ ...btnStyle, opacity: isSaving ? 0.65 : 1 }}>
            {isSaving ? "ထည့်နေပါတယ်..." : "ထည့်မည်"}
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
    const errorStyle = { color: "#b42318", fontSize: 14, margin: 0 };
    const btnStyle = {
    padding: 12,
    background: "#222",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    fontSize: 15,
    cursor: "pointer",
    };
    