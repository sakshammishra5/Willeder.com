import React from 'react';

interface ServiceCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, subtitle, description, icon }) => {
  return (
    <div className="text-center px-4 sm:px-2">
      {/* Icon */}
      <div className="mb-4 sm:mb-6 flex justify-center">
        {icon}
      </div>
      
      {/* Title */}
      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black mb-1 sm:mb-2">
        {title}
      </h3>
      
      {/* Subtitle */}
      <p className="text-base sm:text-lg lg:text-xl text-black mb-4 sm:mb-6 font-medium">
        {subtitle}
      </p>
      
      {/* Description */}
      <p className="text-xs sm:text-sm lg:text-base text-black leading-relaxed max-w-xs mx-auto px-2 sm:px-0">
        {description}
      </p>
    </div>
  );
};

export const Service: React.FC = () => {
  const services = [
    {
      title: "クリエイト",
      subtitle: "高速PDCA",
      description: "多数のクリエイティブを用意。トーナメント方式で広告クリエイティブを高速で比較・テスト。最も高いCVまで素早く見極めの、効率的な広告運用を実現。",
      icon: (
        <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 xl:w-40 xl:h-40 relative mx-auto">
          {/* Content Creator Illustration */}
          <div className="relative w-full h-full">
            {/* Screen/Monitor */}
            <div className="bg-blue-400 w-14 h-10 sm:w-16 sm:h-12 lg:w-20 lg:h-16 rounded-lg transform rotate-12 absolute top-2 sm:top-4 left-3 sm:left-6"></div>
            
            {/* Person */}
            <div className="absolute top-4 sm:top-8 left-4 sm:left-8">
              <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-orange-300 rounded-full mb-1 sm:mb-2"></div>
              <div className="w-4 h-8 sm:w-5 sm:h-10 lg:w-6 lg:h-12 bg-red-400 rounded"></div>
            </div>
            
            {/* Camera */}
            <div className="absolute bottom-0 left-1 sm:left-2">
              <div className="w-4 h-3 sm:w-5 sm:h-3 lg:w-6 lg:h-4 bg-black rounded"></div>
              <div className="w-0.5 h-4 sm:h-6 lg:h-8 bg-black mx-auto"></div>
              <div className="w-5 h-1.5 sm:w-6 sm:h-1.5 lg:w-8 lg:h-2 bg-black rounded-full"></div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-1 sm:-top-2 right-2 sm:right-4 w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full"></div>
            <div className="absolute top-3 sm:top-6 right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full"></div>
            <div className="absolute bottom-2 sm:bottom-4 right-4 sm:right-8">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-yellow-300"></div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "配信面",
      subtitle: "高速PDCA",
      description: "キャンペーンの再構築、配信チャネルの見直し、入札単価の調整などを高速に行い、広告配信を最適化。",
      icon: (
        <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 xl:w-40 xl:h-40 relative mx-auto">
          {/* Laptop and Analytics */}
          <div className="relative w-full h-full">
            {/* Laptop */}
            <div className="bg-gray-700 w-16 h-10 sm:w-20 sm:h-12 lg:w-24 lg:h-16 rounded-t-lg absolute top-4 sm:top-8 left-2 sm:left-4"></div>
            <div className="bg-gray-600 w-18 h-1.5 sm:w-22 sm:h-1.5 lg:w-28 lg:h-2 rounded-b-lg absolute top-14 sm:top-20 lg:top-24 left-1 sm:left-2"></div>
            
            {/* Screen content */}
            <div className="absolute top-5 sm:top-10 left-3 sm:left-6 w-14 h-8 sm:w-16 sm:h-9 lg:w-20 lg:h-12 bg-black rounded">
              <div className="w-10 h-1.5 sm:w-12 sm:h-1.5 lg:w-16 lg:h-2 bg-red-400 absolute top-1 sm:top-2 left-1 sm:left-2 rounded"></div>
              <div className="w-8 h-1.5 sm:w-9 sm:h-1.5 lg:w-12 lg:h-2 bg-red-400 absolute top-3 sm:top-4 lg:top-5 left-1 sm:left-2 rounded"></div>
            </div>
            
            {/* Chat bubbles */}
            <div className="absolute top-1 sm:top-2 right-3 sm:right-6">
              <div className="w-5 h-4 sm:w-6 sm:h-4 lg:w-8 lg:h-6 bg-pink-400 rounded-full mb-0.5 sm:mb-1"></div>
              <div className="w-4 h-3 sm:w-5 sm:h-3 lg:w-6 lg:h-4 bg-pink-300 rounded-full"></div>
            </div>
            
            {/* Coins */}
            <div className="absolute top-2 sm:top-4 left-0 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-yellow-400 rounded-full border border-yellow-500"></div>
            <div className="absolute top-0 right-1 sm:right-2 w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 bg-yellow-400 rounded-full border border-yellow-500"></div>
            
            {/* WiFi symbol */}
            <div className="absolute bottom-1 sm:bottom-2 right-0">
              <div className="w-4 h-3 sm:w-5 sm:h-3 lg:w-6 lg:h-4 border border-blue-400 rounded-b-full"></div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "LPO",
      subtitle: "高速PDCA",
      description: "ヒートマップ等ユーザー動線を分析し、迅速にLPを修正。ページの情報量やクロール率を改善し、より高いCV率を実現。",
      icon: (
        <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 xl:w-40 xl:h-40 relative mx-auto">
          {/* Mobile and Analytics Dashboard */}
          <div className="relative w-full h-full">
            {/* Mobile Phone */}
            <div className="absolute top-2 sm:top-4 right-4 sm:right-8">
              <div className="bg-white border border-gray-300 w-8 h-14 sm:w-10 sm:h-16 lg:w-12 lg:h-20 rounded-lg"></div>
              <div className="absolute top-0.5 sm:top-1 left-0.5 sm:left-1 w-7 h-11 sm:w-8 sm:h-13 lg:w-10 lg:h-16 bg-gray-100 rounded">
                <div className="w-5 h-1 sm:w-6 sm:h-1.5 lg:w-8 lg:h-2 bg-red-400 absolute top-1 sm:top-2 left-0.5 sm:left-1 rounded"></div>
                <div className="w-4 h-1 sm:w-4 sm:h-1.5 lg:w-6 lg:h-2 bg-gray-300 absolute top-3 sm:top-4 lg:top-5 left-0.5 sm:left-1 rounded"></div>
                <div className="w-4.5 h-1 sm:w-5 sm:h-1.5 lg:w-7 lg:h-2 bg-gray-300 absolute top-5 sm:top-6 lg:top-8 left-0.5 sm:left-1 rounded"></div>
              </div>
            </div>
            
            {/* Dashboard/Charts */}
            <div className="absolute top-0 left-0">
              <div className="bg-yellow-200 w-14 h-10 sm:w-16 sm:h-12 lg:w-20 lg:h-16 rounded-lg transform -rotate-6"></div>
              <div className="absolute top-1 sm:top-2 left-1 sm:left-2">
                {/* Bar chart */}
                <div className="flex items-end gap-0.5 sm:gap-1">
                  <div className="w-1 h-3 sm:w-1.5 sm:h-4 lg:w-2 lg:h-6 bg-blue-400"></div>
                  <div className="w-1 h-4 sm:w-1.5 sm:h-5 lg:w-2 lg:h-8 bg-green-400"></div>
                  <div className="w-1 h-2 sm:w-1.5 sm:h-3 lg:w-2 lg:h-4 bg-red-400"></div>
                  <div className="w-1 h-3.5 sm:w-1.5 sm:h-4.5 lg:w-2 lg:h-7 bg-yellow-400"></div>
                </div>
              </div>
            </div>
            
            {/* Additional chart elements */}
            <div className="absolute bottom-0 left-2 sm:left-4">
              <div className="bg-blue-200 w-11 h-8 sm:w-13 sm:h-9 lg:w-16 lg:h-12 rounded-lg transform rotate-12"></div>
              <div className="absolute top-1 sm:top-2 left-1 sm:left-2">
                <div className="w-8 h-1 sm:w-9 sm:h-1.5 lg:w-12 lg:h-2 bg-orange-400 rounded"></div>
                <div className="w-5 h-0.5 sm:w-6 sm:h-0.5 lg:w-8 lg:h-1 bg-green-400 rounded mt-0.5 sm:mt-1"></div>
                <div className="w-7 h-0.5 sm:w-8 sm:h-0.5 lg:w-10 lg:h-1 bg-blue-400 rounded mt-0.5 sm:mt-1"></div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-4 sm:top-8 right-1 sm:right-2 w-2 h-2 sm:w-3 sm:h-3 bg-pink-400 rounded-full"></div>
            <div className="absolute bottom-4 sm:bottom-8 right-2 sm:right-4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full"></div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="bg-pink-200 py-12 sm:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-3 sm:mb-4">
            サービス内容
          </h2>
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            <div className="flex-1 h-px bg-red-400 max-w-24 sm:max-w-xs"></div>
            <span className="text-red-500 font-medium tracking-wider text-sm sm:text-base">SERVICE</span>
            <div className="flex-1 h-px bg-red-400 max-w-24 sm:max-w-xs"></div>
          </div>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              subtitle={service.subtitle}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};