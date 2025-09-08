import React from 'react';
import Image from 'next/image'

interface ServiceCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, subtitle, description, icon }) => {
  return (
    <div className="w-[343px] h-[460px] sm:h-fit lg:h-fit sm:w-full lg-w-full text-center max-w-[410px] font-noto-sans-jp font-medium text-base leading-[1.25] tracking-normal">
      {/* Icon */}
      <div className="w-[280px] h-[280px] mx-auto">
        <Image width={100} height={100} src={icon} alt="" className="h-full w-full" />
      </div>
      <div className='extra-compact'>
        {/* div container for title and subtitle and green border */}
        <div className='py-2'>
          {/* Title */}
          <h3 className="text-xl sm:text-2xl lg:text-5xl font-bold text-black mb-1 sm:mb-2">
            {title}
          </h3>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-3xl text-black mb-4 sm:mb-6 font-bold">
            {subtitle}
          </p>
        </div>
        {/* green border */}
        <div className='w-full h-1 bg-[linear-gradient(to_left,#99FF66,#55FF00,#DCFFCA)]'>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm lg:text-tiny text-left py-2  font-medium text-black w-full  px-2 sm:px-0">
          {description}
        </p>
      </div>
    </div>
  );
};

export const Service: React.FC = () => {
  const services = [
    {
      title: "クリエイト",
      subtitle: "高速PDCA",
      description: "多数のクリエイティブを用意。トーナメント方式で広告クリエイティブを高速で比較・テスト。最も高いCV率を素早く見極め、効果的な広告運用を実現。",
      icon: "/service_png_1.png"
    },
    {
      title: "配信面",
      subtitle: "高速PDCA",
      description: "キャンペーンの再構築、配信チャネルの見直し、入札単価の調整などを高速に行い、広告配信を最適化。",
      icon: "/service_png_2.png"
    },
    {
      title: "LPO",
      subtitle: "高速PDCA",
      description: "ヒートマップ等ユーザー動線を分析し、迅速にLPを修正。ページの情報量やクロール率を改善し、より高いCV率を実現。",
      icon: "/service_png_3.png"
    }
  ];

  return (
    <section className="bg-pink-200 pt-[96px] pb-[160px] px-[16px]  sm:px-[16px] sm:pt-[96px] sm:pb-[160px] lg:px-[80px] lg:pt-[96px] lg:pb-[160px]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-3 sm:mb-4">
            サービス内容
          </h2>
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            <div className="flex-1 h-px bg-red-400 max-w-[108px] sm:max-w-[325px]"></div>
            <span className="text-red-500 font-medium tracking-wider text-sm sm:text-base">SERVICE</span>
            <div className="flex-1 h-px bg-red-400 max-w-[108px] sm:max-w-[325px]"></div>
          </div>
        </div>

        {/* Service Cards */}
        <div className="flex flex-wrap justify-center lg:gap-6 lg:grid lg:grid-cols-3 ">
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