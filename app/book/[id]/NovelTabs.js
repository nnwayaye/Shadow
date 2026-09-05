'use client';

    import { useState } from "react";

    export default function NovelTabs({ novelId, synopsis, chapters }) {
    const [activeTab, setActiveTab] = useState("summary");

    return (
      <div>
        <div style={tabBarStyle} role="tablist" aria-label="ဝတ္ထုအချက်အလက်">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "summary"}
            onClick={() => setActiveTab("summary")}
            style={tabStyle(activeTab === "summary")}
          >
            အကျဉ်းချုပ်
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "chapters"}
            onClick={() => setActiveTab("chapters")}
            style={tabStyle(activeTab === "chapters")}
          >
            အခန်းများ
          </button>
        </div>

        {activeTab === "summary" ? (
          <section style={{ paddingTop: 20 }}>
            <h2 style={sectionTitleStyle}>အကျဉ်းချုပ်</h2>
            <p style={{ lineHeight: 1.9, whiteSpace: "pre-wrap", margin: 0 }}>
              {synopsis || "အကျဉ်းချုပ် မရှိသေးပါ။"}
            </p>
          </section>
        ) : (
          <section style={{ paddingTop: 20 }}>
            <h2 style={sectionTitleStyle}>အခန်းများ</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {chapters && chapters.length > 0 ? (
                chapters.map((chapter, index) => (
                  <a
                    key={chapter.id}
                    href={"/book/" + novelId + "/" + chapter.chapter_number}
                    style={chapterLinkStyle}
                  >
                    {index + 1}. အခန်း {chapter.chapter_number}
                  </a>
                ))
              ) : (
                <p style={{ color: "var(--muted)" }}>အခန်း မတင်ရသေးပါ။</p>
              )}
            </div>
          </section>
        )}
      </div>
    );
    }

    const tabBarStyle = {
    display: "flex",
    borderBottom: "1px solid var(--border)",
    marginTop: 24,
    };

    const tabStyle = (active) => ({
    flex: 1,
    padding: "13px 10px",
    border: "none",
    borderBottom: active ? "3px solid var(--accent)" : "3px solid transparent",
    background: "transparent",
    color: active ? "var(--accent)" : "var(--muted)",
    font: "inherit",
    fontWeight: 700,
    cursor: "pointer",
    });

    const sectionTitleStyle = {
    fontSize: 22,
    margin: "0 0 14px",
    };

    const chapterLinkStyle = {
    display: "block",
    padding: "13px 16px",
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    color: "var(--text)",
    textDecoration: "none",
    };
    