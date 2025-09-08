// components/layout/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'
// import { Button } from '@/app/components/ui/Button';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'visible';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="border-b  border-black lg:h-16 flex justify-end items-center bg-white fixed w-full z-20 top-0">
        <div className="w-full h-full flex items-center justify-between min-h-[64px] lg:min-h-[64px]">
          {/* Logo - Always on the left */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0 pl-4">
            <Image width={100} height={100} src="https://www.willeder.com/assets/image/willeder-logo.svg" alt="" />
          </Link>

          {/* Desktop Navigation - All items on the right */}
          <div className="hidden lg:flex h-full text-lg gap-24 items-center">
            <Link href="/" className="font-medium text-gray-900 hover:text-red-600 transition-colors">
              TOP
            </Link>
            <Link href="/blogs" className="font-medium text-gray-900 hover:text-red-600 transition-colors">
              ブログ
            </Link>
            <Link href="/contact">
              <button
                className="flex hover:bg-[#AD002D]   py-5 pr-4 pl-8  bg-black text-white text-sm  font-medium"
              >
                お問い合わせ
                <span className="ml-2 w-[34px] h-[24px]">
                  <Image width={100} height={100} className='w-full h-full' src="/arrow_1.png" alt="" />
                </span>
              </button>
            </Link>
          </div>

          {/* Tablet Navigation - Center nav items, right contact button */}
          <nav className="hidden sm:flex text-sm h-full lg:hidden items-center gap-16 ">
            <Link href="/" className="text-sm font-medium text-gray-900 hover:text-red-600 transition-colors">
              TOP
            </Link>
            <Link href="/blogs" className="text-sm font-medium text-gray-900 hover:text-red-600 transition-colors">
              ブログ
            </Link>
            <div className="hidden sm:block lg:hidden">
              <Link href="/contact">
                <button
                  className="w-full flex h-16 py-5 pr-4 pl-8  bg-black hover:bg-[#AD002D] text-white text-sm  font-medium"
                >
                  お問い合わせ
                  <span className="ml-2 w-[34px] h-[24px]">
                    <Image width={100} height={100} className='w-full h-full' src="/arrow_1.png" alt="" />
                  </span>
                </button>
              </Link>
            </div>
          </nav>

          {/* Contact Button - Tablet only, on the right */}

          {/* Mobile Hamburger Menu */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-900 hover:text-red-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="sm:hidden fixed top-0 left-0 right-0 z-30 bg-white shadow-lg">
          {/* Header with logo and close button */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="https://www.willeder.com/assets/image/willeder-logo.svg" alt="" />
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-gray-900 hover:text-red-600 focus:outline-none"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col">
            {/* Navigation Links */}
            <Link
              href="/"
              className="block w-full text-center py-4 text-lg font-medium text-gray-900 hover:text-red-600 transition-colors border-b border-gray-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              TOP
            </Link>

            <Link
              href="/blogs"
              className="block w-full text-center py-4 text-lg font-medium text-gray-900 hover:text-red-600 transition-colors border-b border-gray-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ブログ
            </Link>

            {/* Contact Button */}
            <div className="p-4">
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <button
                  className="w-full bg-red-600 hover:bg-red-700 text-white text-base py-3 px-6 rounded-full font-medium transition-colors"
                >
                  お問い合わせはこちら
                  <span className="ml-2">▶</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}