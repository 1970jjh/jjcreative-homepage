
import React from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart3, Users, Gamepad2, CheckCircle, ArrowRight, Star, MonitorPlay, MessageCircle, FileText } from 'lucide-react';
import { Feature, Stat } from '../types';

const features: Feature[] = [
  {
    title: "AI 기반 진단",
    description: "AI 조직 진단 툴을 활용하여 현재 조직의 문제점을 정밀하게 분석하고 최적의 솔루션을 도출합니다.",
    iconName: "BarChart3",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "검증된 전문가 그룹",
    description: "대기업 교육팀 출신 및 분야별 석/박사급 강사진이 퀄리티 높은 강의와 퍼실리테이션을 제공합니다.",
    iconName: "Users",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "게이미피케이션 + 시뮬레이션 기반 학습",
    description: "게임과 시뮬레이션을 접목하여 학습자가 주도적으로 참여하고 몰입할 수 있는 실전형 교육을 제공합니다.",
    iconName: "Gamepad2",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80"
  }
];

const stats: Stat[] = [
  { value: "50,000+", label: "누적 교육생" },
  { value: "120+", label: "파트너 기업" },
  { value: "4.9", label: "교육 만족도 (5.0 만점)" }
];

const reviews = [
  { text: "AI 툴을 활용하니 업무 시간이 절반으로 줄었어요! 진짜 신기합니다.", author: "마케팅팀 대리", company: "A사" },
  { text: "팀빌딩이 이렇게 재밌을 수 있다니, 팀 분위기가 확 바뀌었습니다.", author: "영업팀 과장", company: "B사" },
  { text: "리더십 교육을 통해 팀원들과 소통하는 법을 새로 배웠습니다.", author: "개발팀 팀장", company: "C사" },
  { text: "신입사원 연수 프로그램, MZ세대 맞춤형이라 반응이 뜨거웠습니다.", author: "HR 담당자", company: "D사" },
  { text: "디자인 씽킹으로 우리 팀의 고질적인 문제를 해결했습니다.", author: "기획팀 사원", company: "E사" },
  { text: "협업 시뮬레이션 게임, 몰입도가 장난 아니네요. 강추합니다!", author: "생산팀 반장", company: "F사" },
  { text: "데이터 기반의 조직 진단, 우리 회사의 현주소를 정확히 알게 되었습니다.", author: "경영지원 이사", company: "G사" },
  { text: "AI 시대에 딱 맞는 메타버스 팀빌딩, 신선하고 즐거웠습니다.", author: "IT기업 대표", company: "H사" },
  { text: "성과 관리 면담 스킬, 이제 자신 있게 할 수 있습니다.", author: "영업본부장", company: "I사" },
  { text: "갈등 관리 교육 덕분에 타 부서와의 협업이 원활해졌습니다.", author: "PM", company: "J사" },
  { text: "창의적 문제해결 과정, 아이디어가 샘솟는 시간이었습니다.", author: "R&D 연구원", company: "K사" },
  { text: "전사 워크숍 프로그램, 모든 직원이 만족한 최고의 행사였습니다.", author: "교육 담당자", company: "L사" },
];

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1528605105345-5344ea20e269?auto=format&fit=crop&q=80&w=800" 
            alt="Corporate Education AI Office" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-jjnavy/70 mix-blend-multiply"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in-up">
            조직의 잠재력을 깨우는<br/>
            <span className="text-jjorange">창의적 러닝 솔루션</span>
          </h1>
          <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            JJ Creative 교육연구소는 이론을 넘어 현업의 문제를 해결하는 실전형 기업 교육을 설계합니다. 변화는 여기서 시작됩니다.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8">
            <a 
              href="https://blog.naver.com/wofyrhd" 
              target="_blank" 
              rel="noreferrer"
              className="px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2 w-full md:w-auto hover:-translate-y-1"
            >
              <MonitorPlay className="w-5 h-5" />
              리얼 교육장면 보기
            </a>
            <a 
              href="https://notebooklm.google.com/notebook/329d933e-d7b8-4981-94f3-b76bdd6142eb" 
              target="_blank" 
              rel="noreferrer"
              className="px-6 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2 w-full md:w-auto hover:-translate-y-1"
            >
              <MessageCircle className="w-5 h-5" />
              JJ 교육 챗봇 질문하기
            </a>
            <a 
              href="https://form.naver.com/response/S1p9qf7_I9qBZ96COOdSzA" 
              target="_blank" 
              rel="noreferrer"
              className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-xl font-bold text-lg transition-all backdrop-blur-md flex items-center justify-center gap-2 w-full md:w-auto hover:-translate-y-1"
            >
              <FileText className="w-5 h-5" />
              교육 제안서 의뢰 하기
            </a>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-jjnavy mb-4">왜 기존의 기업 교육은 현업에 적용되지 않을까요?</h2>
            <p className="text-lg text-gray-600">"즐거웠지만 남는 게 없는 교육, 실무와 동떨어진 이론, 수동적인 참여..."</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="text-jjnavy" size={24} />
              </div>
              <h3 className="text-xl font-bold text-jjnavy mb-3">Customization</h3>
              <p className="text-gray-600 leading-relaxed">
                AI로 기업의 문화와 니즈를 분석한 100% 맞춤형 설계를 제공합니다. 정해진 틀에 맞추지 않습니다.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="text-jjorange" size={24} />
              </div>
              <h3 className="text-xl font-bold text-jjnavy mb-3">Engagement</h3>
              <p className="text-gray-600 leading-relaxed">
                학습자가 주도적으로 참여하는 게이미피케이션 및 액션 러닝 기법을 도입하여 몰입도를 극대화합니다.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="text-jjnavy" size={24} />
              </div>
              <h3 className="text-xl font-bold text-jjnavy mb-3">Insight</h3>
              <p className="text-gray-600 leading-relaxed">
                이론에 그치지 않고 현업에 즉시 적용 가능한 실질적 Tool과 인사이트를 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-jjorange font-bold uppercase tracking-wider text-sm">Our Strength</span>
            <h2 className="text-3xl md:text-4xl font-bold text-jjnavy mt-2">JJ Creative만의 차별화된 강점</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="overflow-hidden rounded-xl mb-6 shadow-lg h-64 relative">
                   <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  {feature.iconName === 'BarChart3' && <BarChart3 className="text-jjorange" />}
                  {feature.iconName === 'Users' && <Users className="text-jjorange" />}
                  {feature.iconName === 'Gamepad2' && <Gamepad2 className="text-jjorange" />}
                  <h3 className="text-2xl font-bold text-jjnavy">{feature.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof & Reviews Marquee */}
      <section className="py-20 bg-jjnavy text-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-jjorange opacity-10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 opacity-10 rounded-full -ml-48 -mb-48 blur-3xl"></div>

        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">숫자가 증명하는 JJ Creative의 교육 효과</h2>
              <p className="text-blue-200">데이터로 증명된 성과, 믿고 맡길 수 있는 파트너입니다.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-16 border-b border-white/10 pb-12">
              {stats.map((stat, idx) => (
                <div key={idx}>
                  <div className="text-5xl md:text-6xl font-bold text-jjorange mb-2">{stat.value}</div>
                  <div className="text-gray-300 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Scrolling Reviews Marquee */}
          <div className="w-full overflow-hidden py-8 border-y border-white/5 bg-white/5">
            <div className="flex w-max animate-marquee hover:pause">
              {/* Double the reviews for seamless looping */}
              {[...reviews, ...reviews].map((review, idx) => (
                <div key={idx} className="mx-4 w-[350px] bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 flex flex-col justify-between h-48 hover:bg-white/15 transition-colors">
                  <div>
                    <div className="flex gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={14} fill="#F47C20" stroke="none" />)}
                    </div>
                    <p className="text-lg font-light leading-relaxed line-clamp-3 italic">
                      "{review.text}"
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                    <span className="text-xs text-gray-400 bg-white/10 px-2 py-1 rounded">{review.company}</span>
                    <span className="text-sm font-bold text-jjorange">{review.author}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
