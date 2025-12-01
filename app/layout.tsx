// src/app/layout.tsx
import type { Metadata } from "next";
import "./"; // 전역 스타일

export const metadata: Metadata = {
  title: "Next.js Arch Example",
  description: "Server vs Client Component Demo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-gray-100 text-gray-900">{children}</body>
    </html>
  );
}
