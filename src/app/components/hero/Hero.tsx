import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  title = "ただ作るのではなく、",
  subtitle = "成果につながる「本質的なものづくり」を。",
  buttonText = "お問い合わせはこちら",
//   onButtonClick = () => console.log('Button clicked')
}) => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border border-gray-300 rounded-lg transform rotate-12"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-gray-300 rounded-lg transform -rotate-6"></div>
        <div className="absolute bottom-32 left-20 w-28 h-28 border border-gray-300 rounded-lg transform rotate-45"></div>
      </div>

      <div className="container mx-auto px-6 py-20 flex items-center min-h-screen">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                {title}
                <br />
                <span className="text-gray-800">{subtitle}</span>
              </h1>
            </div>
            
            <button 
            //   onClick={onButtonClick}
              className="group bg-red-700 hover:bg-red-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              {buttonText}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Animated Illustration */}
          <div className="relative flex items-center justify-center">
            <img 
              src="https://pertomdigital.co.ke/wp-content/uploads/2022/06/91030-deal-animation-by-itoolkr.gif"
              alt="Deal Animation"
              className="w-full max-w-lg h-auto object-contain"
              loading="eager"
            />
          </div>
        </div>

        {/* Mobile and Tablet Layout */}
        <div className="lg:hidden flex flex-col items-center text-center space-y-8 w-full">
          {/* Text Content */}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {title}
              <br />
              <span className="text-gray-800">{subtitle}</span>
            </h1>
          </div>

          {/* Animated Illustration */}
          <div className="relative flex items-center justify-center w-full max-w-md">
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
            className="group bg-red-700 hover:bg-red-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            {buttonText}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

    </section>
  );
};

