
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProcessStep } from '../types';

const steps: ProcessStep[] = [
  { step: 1, title: "문의 접수", description: "홈페이지 또는 전화" },
  { step: 2, title: "사전 진단", description: "현황 분석 및 미팅" },
  { step: 3, title: "제안 및 조율", description: "맞춤형 커리큘럼" },
  { step: 4, title: "교육 운영", description: "전문 강사 파견" },
  { step: 5, title: "결과 보고", description: "만족도 및 리포트" }
];

export const Contact: React.FC = () => {
  return (
    <div className="w-full bg-white">
      {/* Header */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-gray-100">
        <div className="absolute inset-0">
          <img 
            src="https://picsum.photos/seed/customer_service/1920/600" 
            alt="Contact" 
            className="w-full h-full object-cover grayscale opacity-30"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl font-bold text-jjnavy mb-4">성공적인 교육의 시작</h1>
          <p className="text-xl text-gray-600">궁금한 점을 남겨주시면 24시간 이내에 전문 컨설턴트가 답변드립니다.</p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative">
             {/* Connector Line (Desktop) */}
             <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 transform -translate-y-1/2"></div>
             
             {steps.map((s) => (
               <div key={s.step} className="flex flex-col items-center bg-white p-4 z-10 w-full md:w-auto">
                 <div className="w-12 h-12 bg-jjnavy text-white rounded-full flex items-center justify-center font-bold text-xl mb-4 shadow-lg ring-4 ring-white">
                   {s.step}
                 </div>
                 <h3 className="font-bold text-jjnavy text-lg">{s.title}</h3>
                 <p className="text-gray-500 text-sm text-center">{s.description}</p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* Main Content: Info & Animated Text */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-jjnavy mb-8">Contact Information</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-jjorange" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">Address</h3>
                    <p className="text-gray-600">서울시 마포구 성암로9안길 24 B101호</p>
                    <p className="text-gray-400 text-sm">JJ Creative 교육연구소</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="text-jjorange" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">Phone</h3>
                    <p className="text-gray-600">010-8448-2354</p>
                    <p className="text-gray-400 text-sm">평일 09:00 - 18:00 (주말/공휴일 휴무)</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="text-jjorange" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">Email</h3>
                    <p className="text-gray-600">jjh@jjcreative.co.kr</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Animated Corporate Education Text (Replaces Form) */}
            <div className="bg-gradient-to-br from-jjnavy to-slate-900 p-8 md:p-10 rounded-2xl shadow-2xl border border-gray-700 h-[400px] flex items-center justify-center relative overflow-hidden group">
               {/* Background decoration */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-jjorange opacity-10 rounded-full blur-3xl -mr-32 -mt-32 animate-pulse group-hover:opacity-20 transition-opacity duration-1000"></div>
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 opacity-10 rounded-full blur-3xl -ml-32 -mb-32 animate-pulse group-hover:opacity-20 transition-opacity duration-1000" style={{ animationDelay: '1s' }}></div>
               
               {/* Animated Particles/Grid Effect (Optional simple overlay) */}
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

               <motion.div
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ 
                   duration: 0.8,
                   type: "spring",
                   bounce: 0.4
                 }}
                 className="relative z-10 text-center flex flex-col items-center"
               >
                 <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-white text-3xl md:text-5xl font-extrabold tracking-tight mb-2 block"
                 >
                   기업교육
                 </motion.span>
                 <motion.span
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6, type: "spring" }}
                    className="text-jjorange text-4xl md:text-6xl font-black tracking-tighter block"
                    style={{ textShadow: "0 4px 20px rgba(244, 124, 32, 0.5)" }}
                 >
                   with AI
                 </motion.span>
                 
                 <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "60px" }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="h-1 bg-white mt-6 rounded-full"
                 />
               </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
