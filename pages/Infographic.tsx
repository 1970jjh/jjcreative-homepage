
import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

const INFOGRAPHIC_IMAGES = [
  {
    url: "https://raw.githubusercontent.com/1970jjh/jjcreative-images/main/%5B%EC%A0%9C%EC%95%88%EC%84%9C%5D%20%ED%95%9C%EC%9E%A5%EC%9C%BC%EB%A1%9C%20%EB%B3%B4%EB%8A%94%202026%20JJ%20Creative%EA%B5%90%EC%9C%A1%EC%97%B0%EA%B5%AC%EC%86%8C%20%EB%8C%80%ED%91%9C%20%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8/2026%20%EA%B8%B0%EC%97%85%EA%B5%90%EC%9C%A1.PNG",
    title: "2026 기업교육 프로그램"
  },
  {
    url: "https://raw.githubusercontent.com/1970jjh/jjcreative-images/main/%5B%EC%A0%9C%EC%95%88%EC%84%9C%5D%20%ED%95%9C%EC%9E%A5%EC%9C%BC%EB%A1%9C%20%EB%B3%B4%EB%8A%94%202026%20JJ%20Creative%EA%B5%90%EC%9C%A1%EC%97%B0%EA%B5%AC%EC%86%8C%20%EB%8C%80%ED%91%9C%20%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8/withAI.PNG",
    title: "AI 활용 교육"
  },
  // 1P 폴더 이미지 (3.PNG ~ 22.PNG)
  ...Array.from({ length: 20 }, (_, i) => ({
    url: `https://raw.githubusercontent.com/1970jjh/jjcreative-images/main/1P/${i + 3}.PNG`,
    title: `프로그램 상세 ${i + 1}`
  }))
];

export const Infographic: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="w-full bg-white">
      {/* Header */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=80"
            alt="Infographic Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-jjnavy/80"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">인포그래픽</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            JJ Creative 교육연구소의 프로그램을 한눈에 살펴보세요
          </p>
        </div>
      </section>

      {/* Infographic Images */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {INFOGRAPHIC_IMAGES.map((image, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer hover:shadow-xl transition-shadow"
                onClick={() => setSelectedImage(image.url)}
              >
                <div className="relative">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-4">
                      <ZoomIn size={32} className="text-jjnavy" />
                    </div>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-bold text-jjnavy">{image.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">클릭하여 크게 보기</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors z-10"
          >
            <X size={28} className="text-white" />
          </button>
          <div
            className="relative w-[95vw] h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Infographic"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};
