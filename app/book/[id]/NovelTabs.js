'use client';

    import { useState } from "react";

    const PAGE_SIZE = 100;

    export default function NovelTabs({ novelId, synopsis, chapters }) {
    const [activeTab, setActiveTab] = useState("summary");
    const [currentPage, setCurrentPage] = useState(1);

    const pageCount = Math.ceil(chapters.length / PAGE_SIZE);
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const visibleChapters = chapters.slice(startIndex, startIndex + PAGE_SIZE);

    function changePage(page) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

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

            {pageCount > 1 && (
              <div style={paginationStyle} aria-label="အခန်းစာရင်း စာမျက်နှာများ">
                <button
                  type="button"
                  onClick={() => changePage(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={pageButtonStyle(currentPage === 1)}
                >
                  ‹
                </button>
                {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
                  <button
                    type="button"
                    key={page}
                    onClick={() => changePage(page)}
                    style={pageNumberStyle(page === currentPage)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => changePage(currentPage + 1)}
                  disabled={currentPage === pageCount}
                  style={pageButtonStyle(currentPage === pageCount)}
                >
                  ›
                </button>
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {visibleChapters.length > 0 ? (
                visibleChapters.map((chapter, index) => (
                  <a
                    key={chapter.id}
                    href={"/book/" + novelId + "/" + chapter.chapter_number}
                    style={chapterLinkStyle}
                  >
                    <span style={chapterIndexStyle}>{startIndex + index + 1}</span>
                    <span>အခန်း {chapter.chapter_number}</span>
                  </a>
                ))
              ) : (
                <p style={{ color: "var(--muted)" }}>အခန်း မတင်ရသေးပါ။</p>
              )}
            </div>

            {pageCount > 1 && (
              <div style={{ ...paginationStyle, marginTop: 16 }} aria-label="အခန်းစာရင်း စာမျက်နှာများ">
                <button
                  type="button"
                  onClick={() => changePage(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={pageButtonStyle(currentPage === 1)}
                >
                  ‹
                </button>
                {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
                  <button
                    type="button"
                    key={page}
                    onClick={() => changePage(page)}
                    style={pageNumberStyle(page === currentPage)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => changePage(currentPage + 1)}
                  disabled={currentPage === pageCount}
                  style={pageButtonStyle(currentPage === pageCount)}
                >
                  ›
                </button>
              </div>
            )}
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

    const paginationStyle = {
    display: "flex",
    alignItems: "center",
    gap: 4,
    marginBottom: 12,
    overflowX: "auto",
    };

    const pageNumberStyle = (active) => ({
    minWidth: 36,
    height: 36,
    padding: "0 10px",
    border: "1px solid var(--card-border)",
    borderRadius: 7,
    background: active ? "var(--accent)" : "var(--card-surface)",
    color: active ? "#fff" : "var(--text)",
    font: "inherit",
    cursor: "pointer",
    });

    const pageButtonStyle = (disabled) => ({
    minWidth: 36,
    height: 36,
    padding: "0 10px",
    border: "1px solid var(--card-border)",
    borderRadius: 7,
    background: disabled ? "var(--surface)" : "var(--card-surface)",
    color: disabled ? "var(--muted)" : "var(--text)",
    font: "inherit",
    cursor: disabled ? "not-allowed" : "pointer",
    });

    const chapterLinkStyle = {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "13px 16px",
    background: "var(--card-surface)",
    border: "1px solid var(--card-border)",
    borderRadius: 8,
    color: "var(--text)",
    textDecoration: "none",
    };

    const chapterIndexStyle = {
    minWidth: 24,
    color: "var(--muted)",
    fontWeight: 700,
    };
    