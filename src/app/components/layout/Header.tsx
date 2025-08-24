// components/layout/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/app/components/ui/Button';

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

  return (
    <header className="border-b bg-white fixed w-full z-20 top-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center min-h-[60px] lg:min-h-[80px]">
        
        {/* Logo - Always on the left */}
        <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
          <div className="w-8 h-8 bg-red-600 flex items-center justify-center">
            <span className="text-white text-lg font-bold">W</span>
          </div>
          <span className="text-lg font-bold text-gray-900">Willeder</span>
        </Link>

        {/* Desktop Navigation - All items on the right */}
        <div className="hidden lg:flex items-center ml-auto space-x-6">
          <Link href="/" className="text-sm font-medium text-gray-900 hover:text-red-600 transition-colors">
            TOP
          </Link>
          <Link href="/blogs" className="text-sm font-medium text-gray-900 hover:text-red-600 transition-colors">
            ブログ
          </Link>
          <Link href="/contact">
            <Button
              variant="primary"
              className="bg-black hover:bg-gray-800 text-white text-sm px-6 py-2 rounded-sm font-medium"
            >
              お問い合わせ
              <span className="ml-2">▶</span>
            </Button>
          </Link>
        </div>

        {/* Tablet Navigation - Center nav items, right contact button */}
        <nav className="hidden sm:flex lg:hidden items-center justify-center flex-1 space-x-8">
          <Link href="/" className="text-sm font-medium text-gray-900 hover:text-red-600 transition-colors">
            TOP
          </Link>
          <Link href="/blogs" className="text-sm font-medium text-gray-900 hover:text-red-600 transition-colors">
            ブログ
          </Link>
        </nav>

        {/* Contact Button - Tablet only, on the right */}
        <div className="hidden sm:block lg:hidden">
          <Link href="/contact">
            <Button
              variant="primary"
              className="bg-black hover:bg-gray-800 text-white text-sm px-6 py-2 rounded-sm font-medium"
            >
              お問い合わせ
              <span className="ml-2">▶</span>
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="sm:hidden ml-auto">
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

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-4">
            <Link 
              href="/" 
              className="block text-sm font-medium text-gray-900 hover:text-red-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              TOP
            </Link>
            <Link 
              href="/blogs" 
              className="block text-sm font-medium text-gray-900 hover:text-red-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ブログ
            </Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              <Button
                variant="primary"
                className="w-full bg-black hover:bg-gray-800 text-white text-sm py-3 rounded-sm font-medium"
              >
                お問い合わせ
                <span className="ml-2">▶</span>
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

