````markdown
# 🚀 Next.js App Router: 컴포넌트 분리 전략 가이드

Next.js 13+ (App Router) 개발 시 **Server Component**와 **Client Component**를 구분하는 기준과 전략입니다.

---

## 1. 🌟 골든 룰 (The Golden Rule)

> **"기본은 서버, 인터랙션은 클라이언트"**
>
> 페이지의 뼈대와 정적 콘텐츠는 **서버 컴포넌트**로 유지하고,  
> `onClick`, `useState`가 필요한 말단(Leaf) 요소만 **클라이언트 컴포넌트**로 만드세요.

---

## 2. ✅ 결정 체크리스트 (Decision Matrix)

| 구분       | 기능 / 상황              | **Server Component** (기본값) | **Client Component** (`'use client'`) |
| :--------- | :----------------------- | :---------------------------- | :------------------------------------ |
| **데이터** | 데이터 패칭 (Fetch, DB)  | ✅ **권장** (빠름, 보안 우수) | ❌ (API 라우트 필요)                  |
| **보안**   | 민감 정보 (API Key 등)   | ✅ **안전** (서버에만 존재)   | ❌ (브라우저 노출 위험)               |
| **로직**   | 백엔드 로직 (fs 등)      | ✅ 가능                       | ❌ 불가능                             |
| **상태**   | `useState`, `useReducer` | ❌                            | ✅ **필수**                           |
| **효과**   | `useEffect`, Lifecycle   | ❌                            | ✅ **필수**                           |
| **이벤트** | `onClick`, `onChange`    | ❌                            | ✅ **필수**                           |
| **API**    | 브라우저 API (window 등) | ❌                            | ✅ **필수**                           |
| **훅**     | 커스텀 훅 (State 사용)   | ❌                            | ✅ **필수**                           |

---

## 3. 🏗️ 실전 코딩 패턴 (Best Practice)

**❌ 나쁜 예 (Top-level Client)**
페이지 전체를 클라이언트 컴포넌트로 만들면 서버 컴포넌트의 이점(SEO, 초기 로딩)이 사라집니다.

```tsx
// app/page.tsx
'use client'; // 💩 페이지 전체가 클라이언트 번들이 됨
export default function Page() { ... }
```
````

**✅ 좋은 예 (Leaf Component 패턴)**
서버 컴포넌트가 데이터를 가져오고, 필요한 부분에만 클라이언트 컴포넌트를 '끼워 넣기' 합니다.

```tsx
// 1. app/page.tsx (Server Component)
import InteractiveButton from "@/components/InteractiveButton";

export default async function Page() {
  const data = await getData(); // ⚡ 서버에서 데이터 패칭

  return (
    <main>
      <h1>{data.title}</h1>
      {/* 👇 인터랙션이 필요한 부분만 클라이언트로 분리 */}
      <InteractiveButton initialCount={data.count} />
    </main>
  );
}
```

```tsx
// 2. components/InteractiveButton.tsx (Client Component)
"use client"; // 👈 여기만 클라이언트!

import { useState } from "react";

export default function InteractiveButton({ initialCount }) {
  const [count, setCount] = useState(initialCount);
  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
}
```

---

## 4\. ⚠️ 주의사항

1.  **Server Component → Client Component (Import 가능)**
    - 서버 컴포넌트는 클라이언트 컴포넌트를 import 해서 렌더링할 수 있습니다.
2.  **Client Component → Server Component (Import 불가)**
    - 클라이언트 컴포넌트 파일 안에서 서버 컴포넌트를 import 하면, 그 서버 컴포넌트도 클라이언트 코드로 변환되어 브라우저로 전송됩니다.
    - **해결책:** 서버 컴포넌트를 `children` prop으로 넘겨주면 서버 사이드 렌더링이 유지됩니다.
3.  **Props 직렬화 (Serialization)**
    - 서버에서 클라이언트로 props를 넘길 때는 **직렬화 가능한 데이터**(JSON 호환: string, number, array, object)만 가능합니다.
    - 함수(Function)나 클래스 인스턴스는 넘길 수 없습니다.

````markdown
## 5. 🏛️ 아키텍처 및 데이터 흐름 (Architecture & Data Flow)

Next.js App Router의 아키텍처 핵심은 **단방향 데이터 흐름**과 **경계(Boundary)** 설정입니다.

### 5.1 렌더링 트리 구조 (The Rendering Tree)

애플리케이션은 기본적으로 **서버 컴포넌트**로 구성된 큰 트리이며, 필요한 곳에 **클라이언트 컴포넌트**라는 가지(Branch)가 뻗어 나가는 형태입니다.

- **Root (최상위):** `layout.tsx`, `page.tsx`는 무조건 서버 컴포넌트에서 시작합니다.
- **Boundary (경계선):** `'use client'` 선언은 서버와 클라이언트 사이의 **네트워크 경계(Network Boundary)**를 형성합니다.
- **Leaf (말단):** 상호작용이 필요한 버튼, 입력창 등은 트리의 말단에 위치시킵니다.

### 5.2 데이터 흐름 (Unidirectional Flow)

데이터는 항상 **서버 → 클라이언트**로 흐릅니다.

1.  **Server:** DB/API에서 데이터를 가져옴 (Fetching).
2.  **Server → Client:** 가져온 데이터를 `props`를 통해 클라이언트 컴포넌트로 전달 (Serialization).
3.  **Client:** 전달받은 데이터를 이용해 화면을 그리고, 브라우저 이벤트를 처리.

---

## 6. 🧩 고급 합성 패턴 (Composition Patterns)

가장 헷갈리지만 아키텍처상 가장 중요한 **"클라이언트 컴포넌트 안에 서버 컴포넌트 넣기"** 전략입니다.

### 6.1 문제 상황: Import의 함정

클라이언트 컴포넌트 파일 상단에서 서버 컴포넌트를 `import`하면, 해당 서버 컴포넌트도 클라이언트 번들에 포함되어 버립니다. (서버 렌더링 이점 상실)

```tsx
// ❌ 나쁜 예: Client Component 파일 내부
"use client";
import ServerComp from "./ServerComp"; // 😱 ServerComp도 클라이언트 코드로 변환됨!

export default function ClientWrapper() {
  return (
    <div>
      <ServerComp />
    </div>
  );
}
```
````

### 6.2 해결책: Children Prop (Slot) 패턴

서버 컴포넌트를 직접 import 하지 않고, \*\*부모(서버 컴포넌트)\*\*가 `children`으로 주입해주면 서버 렌더링이 유지됩니다.

**① 클라이언트 컴포넌트 (껍데기 역할)**

```tsx
// components/ClientWrapper.tsx
"use client";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState(false); // 클라이언트 기능 사용 가능

  return (
    <div style={{ opacity: state ? 1 : 0.5 }}>
      <button onClick={() => setState(!state)}>Toggle</button>
      {/* 👇 여기에 무엇이 들어오든 서버에서 렌더링된 결과물(HTML)만 배치됨 */}
      {children}
    </div>
  );
}
```

**② 사용처 (서버 컴포넌트)**

```tsx
// app/page.tsx
import ClientWrapper from "@/components/ClientWrapper";
import ServerComp from "@/components/ServerComp";

export default function Page() {
  return (
    <ClientWrapper>
      {/* ✅ ServerComp는 여전히 서버에서 실행되고 결과만 ClientWrapper로 전달됨 */}
      <ServerComp />
    </ClientWrapper>
  );
}
```

---

## 7\. 📂 폴더 구조 제안 (Folder Structure Recommendation)

아키텍처를 잘 반영한 폴더 구조 예시입니다.

```text
src/
├── app/                  # (Server) 라우팅 및 페이지 진입점
│   ├── layout.tsx        # (Server) 전역 레이아웃
│   ├── page.tsx          # (Server) 메인 페이지 (데이터 패칭 담당)
│   └── dashboard/
│       └── page.tsx
├── components/
│   ├── ui/               # (Client) 재사용 가능한 UI (버튼, 모달 등)
│   │   └── Button.tsx    # 'use client'
│   └── feature/          # (Server/Client) 비즈니스 로직 컴포넌트
│       ├── UserCard.tsx  # (Server) 유저 정보 표시
│       └── SearchBar.tsx # (Client) 검색 입력
├── lib/
│   └── db.ts             # (Server) DB 연결 로직 (클라이언트에서 import 불가하게 설정 권장)
└── services/
    └── api.ts            # (Server) 데이터 패칭 로직
```

```



***

**제가 해드릴 수 있는 다음 단계:**

이 아키텍처 패턴을 적용할 때, **"Context API(Redux, Recoil 등)를 어떻게 적용해야 하는지"**가 다음 고민이 될 수 있습니다. (Provider는 클라이언트 컴포넌트여야 하거든요).

혹시 전역 상태 관리가 필요한 프로젝트라면, **"Root Layout에 Provider 적용하는 법"**을 예제 코드로 추가해 드릴까요?
```
