import React from 'react';
import Link from 'next/link';

interface FooterProps {
  className?: string;
}

 export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return (
    <div className={`w-full ${className}`}>
      {/* CTA Section */}
      <section className="bg-[#B9BDC6] py-24 px-4 sm:py-24 sm:px-6 lg:py-24 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl text-gray-800 mb-8 leading-relaxed">
            <span className="block md:inline">どんな内容でも、</span>
            <span className="block md:inline">お気軽にご相談ください。</span>
          </h2>
          <Link 
            href="/contact"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-medium transition-colors duration-200 inline-flex items-center gap-2"
          >
            お問い合わせはこちら
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Logo */}
          <div className="mb-8">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold hover:text-gray-300 transition-colors">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 3l18 18M3 21l18-18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Willeder
            </Link>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:block">
            {/* Navigation Links */}
            <nav className="flex gap-16 mb-12">
              <Link href="/" className="text-white hover:text-gray-300 transition-colors">
                TOP
              </Link>
              <Link href="/blog" className="text-white hover:text-gray-300 transition-colors">
                ブログ
              </Link>
              <Link href="/contact" className="text-white hover:text-gray-300 transition-colors">
                お問い合わせ
              </Link>
            </nav>

            {/* Company Information - Two Columns */}
            <div className="flex justify-between mb-12">
              {/* US Company Info */}
              <div className="flex-1">
                <h3 className="font-medium mb-2">Willeder Inc.（アメリカ法人）</h3>
                <address className="not-italic text-gray-300 leading-relaxed">
                  501 Congress Avenue, Suite 150, Austin, Texas, 78701,<br />
                  USA
                </address>
              </div>

              {/* Japan Company Info */}
              <div className="flex-1">
                <h3 className="font-medium mb-2">ウィルダー株式会社（日本法人）</h3>
                <address className="not-italic text-gray-300 leading-relaxed">
                  〒141-0022　東京都品川区東五反田1-4-9-606
                </address>
              </div>
            </div>

            {/* Support Email */}
            <div className="mb-12">
              <a 
                href="mailto:support@willeder.com" 
                className="text-white hover:text-gray-300 transition-colors"
              >
                support@willeder.com
              </a>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="block md:hidden">
            {/* Navigation Links */}
            <nav className="flex flex-col gap-4 mb-8">
              <Link href="/" className="text-white hover:text-gray-300 transition-colors">
                TOP
              </Link>
              <Link href="/blog" className="text-white hover:text-gray-300 transition-colors">
                ブログ
              </Link>
              <Link href="/contact" className="text-white hover:text-gray-300 transition-colors">
                お問い合わせ
              </Link>
            </nav>

            {/* Company Information - Stacked */}
            <div className="space-y-6 mb-8">
              {/* US Company Info */}
              <div>
                <h3 className="font-medium mb-2">Willeder Inc.（アメリカ法人）</h3>
                <address className="not-italic text-gray-300 text-sm leading-relaxed">
                  501 Congress Avenue, Suite 150, Austin, Texas, 78701, USA
                </address>
              </div>

              {/* Japan Company Info */}
              <div>
                <h3 className="font-medium mb-2">ウィルダー株式会社（日本法人）</h3>
                <address className="not-italic text-gray-300 text-sm leading-relaxed">
                  〒141-0022　東京都品川区東五反田1-4-9-606
                </address>
              </div>
            </div>

            {/* Support Email */}
            <div className="mb-8">
              <a 
                href="mailto:support@willeder.com" 
                className="text-white hover:text-gray-300 transition-colors text-sm"
              >
                support@willeder.com
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-400 text-sm pt-8 border-t border-gray-800">
            Willeder Inc. all rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

