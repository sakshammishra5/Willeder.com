"use client";
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HeroProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  title = "ただ作るのではなく、成果につながる「本質的なものづくり」を。",
  buttonText = "お問い合わせはこちら",
  //   onButtonClick = () => console.log('Button clicked')
}) => {
  const router = useRouter();

  return (
    <section className="relative px-4 h-[810px] w-full   sm:py-24 sm:px-6  sm:h-full lg:h-[810px] lg:px-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">

      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center w-full">
        {/* Text Content */}
        <div className="flex flex-col gap-16 max-w-[640px] ">
          <div className="">
            <div className="w-[494px] h-[250px] *:mb-5 text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
              <div>ただ作るのではなく、</div>
              <div>成果につながる</div>
              <div>「本質的なものづくり」を。</div>
            </div>
          </div>

          <button
              onClick={() => router.push('/contact')}
            className="w-[405px] h-[68px] group bg-red-700 hover:bg-[#F23D6D] text-white px-12 py-4 rounded-2xl font-semibold text-lg  shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            {buttonText}
            <span className='w-[34px] h-[24px]'>
              <img className='w-full h-full' srcSet="/arrow_1.png" alt="" />
            </span>
          </button>
        </div>

        {/* Animated Illustration */}
        <div className="relative flex items-center justify-center ">
          <img
            src="https://pertomdigital.co.ke/wp-content/uploads/2022/06/91030-deal-animation-by-itoolkr.gif"
            alt="Deal Animation"
            className="w-full max-w-lg h-auto object-contain"
            loading="eager"
          />
        </div>
      </div>

      {/* Mobile and Tablet Layout */}
      <div className="lg:hidden flex flex-col gap-12 items-center text-center w-full h-[768px]">
        {/* Text Content */}
        <div className="w-[343px] h-[104.67px] sm:w-[720px] sm:h-[219px] mb-[13px]">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            <div>ただ作るのではなく、</div>
            <div>成果につながる</div>
            <div>「本質的なものづくり」を。</div>
          </h1>
        </div>

        {/* Animated Illustration */}
        <div className="w-[343px] h-[372.5px] sm:w-[720px] sm:h-[781.92px] relative flex items-center justify-center  max-w-md">
          <img
            src="https://pertomdigital.co.ke/wp-content/uploads/2022/06/91030-deal-animation-by-itoolkr.gif"
            alt="Deal Animation"
            className="w-full h-auto object-contain"
            loading="eager"
          />
        </div>

        {/* Button below image on mobile/tablet */}
        <button
          // onClick={onButtonClick}
          className="w-[298px] h-[62px] group bg-red-700 hover:bg-red-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          {buttonText}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

