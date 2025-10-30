// src/components/UploadForm.jsx
import React, { useState } from "react";
import axios from "axios";

const API_BASE = "https://sendy-slip-web-github-io.onrender.com"; // ✅ Render 백엔드 주소

export default function UploadForm({ setRecords }) {
  const [file, setFile] = useState(null);

  const onPick = (e) => {
    const f = e.target.files?.[0];
    setFile(f || null);
  };

  // 미리보기(JSON) 요청
  const handlePreview = async () => {
    if (!file) return alert("엑셀 파일을 먼저 선택하세요.");
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await axios.post(`${API_BASE}/preview_excel/`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setRecords(res.data.items || []);
      alert(`✅ 미리보기 준비 완료 (총 ${res.data.items?.length || 0}건)`);
    } catch (err) {
      console.error(err);
      alert("❌ 미리보기 변환 중 오류가 발생했습니다.");
    }
  };

  // 필터된 엑셀 다운로드
  const handleDownloadFiltered = async () => {
    if (!file) return alert("엑셀 파일을 먼저 선택하세요.");
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await axios.post(`${API_BASE}/filter_excel/`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob", // 🔹 파일 다운로드를 위해 blob으로
      });

      // 브라우저에서 다운로드 트리거
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "filtered_result.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("❌ 필터 엑셀 다운로드 중 오류가 발생했습니다.");
    }
  };

  return (
    <div style={{ margin: "16px 0" }}>
      <input type="file" accept=".xlsx,.xls" onChange={onPick} />
      <div
        style={{
          marginTop: 12,
          display: "flex",
          gap: 8,
          justifyContent: "center",
        }}
      >
        <button onClick={handlePreview}>미리보기 생성</button>
        <button onClick={handleDownloadFiltered}>필터된 엑셀 다운로드</button>
      </div>
    </div>
  );
}
