import React, { useState } from "react";
import SlipPreview from "./SlipPreview";

export default function PreviewPage({ records }) {
  const [pageIndex, setPageIndex] = useState(0);

  const nextPage = () => {
    if (pageIndex < records.length - 1) setPageIndex(pageIndex + 1);
  };

  const prevPage = () => {
    if (pageIndex > 0) setPageIndex(pageIndex - 1);
  };

  if (!records || records.length === 0) {
    return <p style={{ color: "#555" }}>표시할 데이터가 없습니다.</p>;
  }

  const current = records[pageIndex];

  return (
    <div style={{ textAlign: "center", marginTop: 30 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
        }}
      >
        {/* ✅ K : 엑셀 B열 번호 (예약번호) 왼쪽에 표시 */}
       <h2 style={{ color: "#2b4b80" }}>
  <span style={{ color: "#999", fontWeight: "normal", marginRight: 8 }}>
    {current.K || "-"}   {/* ✅ 엑셀 B열(번호) */}
  </span>
  📄 전표 미리보기
</h2>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <button
          onClick={prevPage}
          disabled={pageIndex === 0}
          style={{
            fontSize: 30,
            background: "none",
            border: "none",
            color: pageIndex === 0 ? "#ccc" : "#2b4b80",
            cursor: pageIndex === 0 ? "default" : "pointer",
          }}
        >
          ◀
        </button>

        <SlipPreview data={current} key={pageIndex} />

        <button
          onClick={nextPage}
          disabled={pageIndex === records.length - 1}
          style={{
            fontSize: 30,
            background: "none",
            border: "none",
            color:
              pageIndex === records.length - 1 ? "#ccc" : "#2b4b80",
            cursor:
              pageIndex === records.length - 1 ? "default" : "pointer",
          }}
        >
          ▶
        </button>
      </div>

      <div style={{ marginTop: 20, color: "#555" }}>
        {pageIndex + 1} / {records.length}
      </div>
    </div>
  );
}
