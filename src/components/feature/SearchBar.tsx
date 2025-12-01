"use client";

import { useState } from "react";
import Button from "../ui/Button"; // 위에서 만든 Client Component 재사용

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    alert(`검색어: ${query} (브라우저에서 실행됨)`);
  };

  return (
    <div className="flex gap-2 p-4 border rounded bg-gray-50">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색어를 입력하세요..."
        className="border p-2 rounded"
      />
      <Button onClick={handleSearch}>검색</Button>
    </div>
  );
}
