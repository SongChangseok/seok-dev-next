"use client";

import { useState } from "react";
import {
  Send,
  Bot,
  User,
  Sparkles,
  Home,
  Settings,
  Trash2,
} from "lucide-react";

export default function ChatbotUI() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content: "안녕하세요! 무엇을 도와드릴까요? 😊",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: messages.length + 2,
        role: "assistant",
        content:
          "죄송합니다. 아직 AI 기능이 연결되지 않았습니다. 여기에 실제 챗봇 로직을 연결하시면 됩니다!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-slate-200 flex flex-col">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-slate-800">AI 챗봇</h2>
              <p className="text-xs text-slate-500">항상 도와드립니다</p>
            </div>
          </div>

          <button className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />새 대화 시작
          </button>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="text-xs font-semibold text-slate-400 mb-3 px-2">
            최근 대화
          </div>

          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <button
                key={i}
                className="w-full p-3 rounded-lg hover:bg-slate-50 transition-colors text-left group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">
                      대화 #{i}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {i === 1 ? "방금 전" : `${i}시간 전`}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-200">
          <button className="w-full p-3 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-3 text-slate-600">
            <Home className="w-5 h-5" />
            <span className="font-medium">메인으로 돌아가기</span>
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">AI 어시스턴트</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-xs text-slate-500">온라인</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <Trash2 className="w-5 h-5 text-slate-600" />
              </button>
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${
                message.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              {/* Avatar */}
              <div
                className={`
                w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                ${
                  message.role === "user"
                    ? "bg-gradient-to-br from-slate-600 to-slate-700"
                    : "bg-gradient-to-br from-blue-600 to-cyan-600"
                }
              `}
              >
                {message.role === "user" ? (
                  <User className="w-5 h-5 text-white" />
                ) : (
                  <Bot className="w-5 h-5 text-white" />
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`
                max-w-2xl px-5 py-4 rounded-2xl
                ${
                  message.role === "user"
                    ? "bg-gradient-to-br from-blue-600 to-cyan-600 text-white"
                    : "bg-white border border-slate-200"
                }
              `}
              >
                <p
                  className={`text-sm leading-relaxed ${
                    message.role === "user" ? "text-white" : "text-slate-800"
                  }`}
                >
                  {message.content}
                </p>
                <p
                  className={`text-xs mt-2 ${
                    message.role === "user" ? "text-blue-100" : "text-slate-400"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString("ko-KR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white border border-slate-200 px-5 py-4 rounded-2xl">
                <div className="flex gap-1">
                  <div
                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-slate-200 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="메시지를 입력하세요..."
                  className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
                전송
              </button>
            </div>

            <p className="text-xs text-slate-400 mt-3 text-center">
              AI가 생성한 답변은 부정확할 수 있습니다. 중요한 정보는
              확인해주세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
