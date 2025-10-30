import React, { useState, useEffect } from "react";

const bg = "/kpp_form.png"; // public 폴더 내 이미지

// 📍 전표 필드별 좌표
const positions = {
  A: { top: 155, left: 210 },  // 상차지상세
  B: { top: 297, left: 207 },  // 하차지상세
  C: { top: 500, left: 215 },  // 배차차량정보
  D: { top: 170, left: 664 },  // N11
  E: { top: 299, left: 664 },  // N12
  F: { top: 500, left: 670 },  // 기타 괄호()
  G: { top: 458, left: 823 },  // 합계
  H: { top: 105, left: 330 },  // 날짜
  I: { top: 13, left: 712 },   // 일련번호
  J: { top: 435, left: 207 },  // "주식회사 센디" 고정

};

export default function SlipPreview({ data }) {
  const [values, setValues] = useState(data || {});
  const [editingKey, setEditingKey] = useState(null);

  // ✅ J 고정값 자동 반영
  useEffect(() => {
    setValues((prev) => ({
      ...prev,
      J: "주식회사 센디",
    }));
  }, [data]);

  const startEdit = (key) => setEditingKey(key);
  const stopEdit = () => setEditingKey(null);

  const onChange = (e) => {
    const val = e.target.value;
    setValues((prev) => ({
      ...prev,
      [editingKey]: val,
    }));
  };

  return (
    <div
      style={{
        position: "relative",
        width: 1027,
        height: 768,
        backgroundImage: `url(${bg})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center top",
        border: "1px solid #ddd",
        margin: "0 auto",
        overflow: "hidden",
      }}
    >
      {Object.keys(positions).map((key) => {
        const pos = positions[key];
        const value = values[key] ?? "";

        return (
          <div
  key={key}
  style={{
    position: "absolute",
    top: pos.top,
    left: pos.left,
    fontSize: 15,
    fontWeight: "bold",
    color: "#222",
    whiteSpace: "pre",
    cursor: "text",
    background:
      editingKey === key
        ? "rgba(255,255,200,0.8)" // 편집 중일 때만 배경 강조
        : "transparent",
    border:
      editingKey === key
        ? "1px solid rgba(150,150,150,0.8)" // 편집 중일 때만 테두리
        : "none", // ✅ 기본 상태에서는 테두리 제거
    borderRadius: 3,
    minWidth: "100px",
    minHeight: "20px",
    padding: "2px 4px",
    transition: "all 0.2s ease",
  }}
  onClick={() => startEdit(key)}
  title={`${key} 수정`}
>
  {editingKey === key ? (
    <input
      value={value}
      onChange={onChange}
      onBlur={stopEdit}
      autoFocus
      style={{
        fontSize: 15,
        width: 200,
        border: "1px solid #999",
        borderRadius: 4,
        padding: "2px 4px",
      }}
    />
  ) : (
    value || "\u00A0" // ✅ 공백 유지 (보이지 않지만 클릭 가능)
  )}
</div>
        );
      })}
    </div>
  );
}
