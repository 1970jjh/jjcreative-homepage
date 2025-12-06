import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT = `당신은 JJ Creative 교육연구소의 친절한 AI 교육 컨설턴트 "JJ Helper"입니다.

## JJ Creative 교육연구소 소개
- 50,000명 이상의 누적 교육생, 120개 이상의 파트너 기업
- 교육 만족도 4.9/5.0
- AI 기반 조직 진단 및 맞춤형 교육 설계
- 게이미피케이션 & 시뮬레이션 기반 실전형 교육

## 주요 교육 프로그램
1. **AI 활용 업무혁신** - AI 툴 활용 실무 교육
2. **리더십 교육** - 팀장/관리자 리더십 역량 강화
3. **팀빌딩 프로그램** - 게이미피케이션 기반 협업 강화
4. **신입사원 온보딩** - MZ세대 맞춤형 연수
5. **문제해결 워크숍** - 디자인 씽킹, 창의적 문제해결
6. **조직문화 진단** - AI 기반 조직 진단 및 컨설팅

## 연락처
- 이메일: jjh@jjcreative.co.kr
- 전화: 010-8448-2354
- 주소: 서울시 마포구 성암로 9안길 24 B101호
- 블로그: https://blog.naver.com/wofyrhd

## 당신의 역할
1. 친근하고 전문적인 톤으로 대화
2. 사용자의 교육 니즈를 파악하고 적절한 프로그램 추천
3. 자연스럽게 교육 제안서 의뢰로 유도 (티나지 않게!)
4. 구체적인 문의는 제안서 의뢰 폼(https://form.naver.com/response/S1p9qf7_I9qBZ96COOdSzA) 안내
5. 답변은 간결하고 명확하게 (2-4문장)
6. 항상 한국어로 답변

대화 시작 시 반갑게 인사하고, 어떤 교육에 관심이 있는지 물어보세요.`;

export const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Initial greeting when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: '안녕하세요! JJ Creative 교육연구소의 AI 교육 컨설턴트입니다. 기업 교육에 관해 궁금한 점이 있으시면 편하게 물어보세요! 어떤 교육에 관심이 있으신가요? 😊'
      }]);
    }
  }, [isOpen, messages.length]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const apiKey = (import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || '') as string;
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: SYSTEM_PROMPT }]
              },
              {
                role: 'model',
                parts: [{ text: '네, 알겠습니다. JJ Creative 교육연구소의 AI 교육 컨설턴트로서 친절하고 전문적으로 상담해 드리겠습니다.' }]
              },
              ...messages.map(msg => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.content }]
              })),
              {
                role: 'user',
                parts: [{ text: userMessage }]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 500,
            }
          })
        }
      );

      const data = await response.json();

      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        const assistantMessage = data.candidates[0].content.parts[0].text;
        setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
      } else {
        throw new Error('Invalid response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '죄송합니다. 일시적인 오류가 발생했습니다. 직접 문의를 원하시면 jjh@jjcreative.co.kr 또는 010-8448-2354로 연락 주세요!'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed left-6 bottom-6 z-50 w-14 h-14 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group ${isOpen ? 'scale-0' : 'scale-100'}`}
        aria-label="AI Helper"
      >
        <Bot size={26} />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-jjorange rounded-full animate-pulse"></span>

        {/* Tooltip */}
        <div className="absolute left-full ml-3 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          AI 교육 상담
          <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
        </div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed left-6 bottom-6 z-50 w-[360px] h-[520px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-[scaleIn_0.3s_ease-out] border border-gray-200">
          <style>{`
            @keyframes scaleIn {
              from { transform: scale(0.8); opacity: 0; }
              to { transform: scale(1); opacity: 1; }
            }
          `}</style>

          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="font-bold">JJ AI Helper</h3>
                <p className="text-xs text-white/80">교육 상담 AI 어시스턴트</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-2 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  message.role === 'user'
                    ? 'bg-jjnavy text-white'
                    : 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
                }`}>
                  {message.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  message.role === 'user'
                    ? 'bg-jjnavy text-white rounded-tr-none'
                    : 'bg-white text-gray-700 rounded-tl-none shadow-sm border border-gray-100'
                }`}>
                  {message.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white shrink-0">
                  <Bot size={16} />
                </div>
                <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="메시지를 입력하세요..."
                className="flex-1 px-4 py-3 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-[10px] text-gray-400 mt-2 text-center">
              Powered by Gemini 2.0 Flash
            </p>
          </div>
        </div>
      )}
    </>
  );
};
