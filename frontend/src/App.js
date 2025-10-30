import React, { useState } from "react";
import UploadForm from "./components/UploadForm";
import PreviewPage from "./components/PreviewPage";

function App() {
  const [records, setRecords] = useState([]);

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h1>📦 Sendy 전표 미리보기</h1>
      <UploadForm setRecords={setRecords} />
      {records.length > 0 ? (
        <PreviewPage records={records} />
      ) : (
        <p style={{ color: "#666", marginTop: 24 }}>
          엑셀(.xlsx)을 업로드하면 미리보기가 여기에 표시됩니다.
        </p>
      )}
    </div>
  );
}

export default App;
