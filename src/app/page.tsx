"use client";

import { useState } from "react";
import { MessageSquare, ChevronRight, Sparkles } from "lucide-react";

export default function MainPage() {
  const [hoveredTool, setHoveredTool] = useState(null);

  const tools = [
    {
      id: "chatbot",
      name: "AI 챗봇",
      description: "똑똑한 AI 어시스턴트와 대화하세요",
      icon: MessageSquare,
      color: "from-blue-500 to-cyan-500",
      available: true,
    },
    {
      id: "coming-soon-1",
      name: "준비중",
      description: "곧 만나요",
      icon: Sparkles,
      color: "from-gray-400 to-gray-500",
      available: false,
    },
    {
      id: "coming-soon-2",
      name: "준비중",
      description: "곧 만나요",
      icon: Sparkles,
      color: "from-gray-400 to-gray-500",
      available: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Header */}
      <header className="border-b border-white/50 bg-white/70 backdrop-blur-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Seok Dev Tools
              </h1>
              <p className="text-sm text-slate-500">유용한 도구 모음</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-slate-800 mb-3">
            안녕하세요 👋
          </h2>
          <p className="text-lg text-slate-600">필요한 도구를 선택해주세요</p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                disabled={!tool.available}
                onMouseEnter={() => setHoveredTool(tool.id)}
                onMouseLeave={() => setHoveredTool(null)}
                className={`
                  group relative p-8 rounded-2xl border-2 transition-all duration-300
                  ${
                    tool.available
                      ? "bg-white border-slate-200 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-100 hover:-translate-y-1 cursor-pointer"
                      : "bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed"
                  }
                `}
              >
                {/* Background Gradient */}
                <div
                  className={`
                  absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300
                  bg-gradient-to-br ${tool.color}
                `}
                />

                {/* Icon */}
                <div
                  className={`
                  w-16 h-16 rounded-xl mb-5 flex items-center justify-center
                  bg-gradient-to-br ${tool.color}
                  ${tool.available ? "group-hover:scale-110" : ""}
                  transition-transform duration-300
                `}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="text-left">
                  <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
                    {tool.name}
                    {tool.available && (
                      <ChevronRight
                        className={`
                        w-5 h-5 text-slate-400 transition-transform duration-300
                        ${hoveredTool === tool.id ? "translate-x-1" : ""}
                      `}
                      />
                    )}
                  </h3>
                  <p className="text-slate-600">{tool.description}</p>
                </div>

                {/* Available Badge */}
                {tool.available && (
                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                      사용 가능
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="mt-16 p-6 rounded-xl bg-white/70 backdrop-blur-sm border border-slate-200">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-1">
                더 많은 기능이 추가될 예정입니다
              </h4>
              <p className="text-sm text-slate-600">
                지속적으로 새로운 도구들이 업데이트됩니다. 기대해주세요!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
