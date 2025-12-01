// src/app/page.tsx
import { getUserData } from "@/lib/db"; // 서버 로직 직접 import 가능
import UserCard from "@/components/feature/UserCard";
import SearchBar from "@/components/feature/SearchBar";

// async 컴포넌트 (Next.js 13+ 강력한 기능)
export default async function Page() {
  // 1. 서버 사이드에서 데이터 패칭 (빠르고 안전함)
  const userData = await getUserData();

  return (
    <main className="max-w-2xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6">대시보드</h1>

      {/* 2. 클라이언트 컴포넌트 배치 (검색 기능) */}
      <section className="mb-8">
        <SearchBar />
      </section>

      {/* 3. 서버 컴포넌트 배치 (데이터 표시) */}
      <section>
        <UserCard data={userData} />
      </section>
    </main>
  );
}
