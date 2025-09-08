// app/contact/page.tsx
'use client';

import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  privacyAgreed: boolean;
  honeypot: string; // Bot protection
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

const ContactPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    privacyAgreed: false,
    honeypot: ''
  });

  const [status, setStatus] = useState<FormStatus>({
    type: 'idle',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check - if filled, it's likely a bot
    if (formData.honeypot) {
      setStatus({
        type: 'error',
        message: 'スパムが検出されました。'
      });
      return;
    }

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({
        type: 'error',
        message: 'すべての必須項目を入力してください。'
      });
      return;
    }

    if (!formData.privacyAgreed) {
      setStatus({
        type: 'error',
        message: 'プライバシーポリシーに同意してください。'
      });
      return;
    }

    setStatus({ type: 'loading', message: '送信中...' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          message: formData.message.trim()
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'お問い合わせを送信いたしました。2営業日以内にご返信いたします。'
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          privacyAgreed: false,
          honeypot: ''
        });
      } else {
        setStatus({
          type: 'error',
          message: data.error || '送信に失敗しました。しばらく時間をおいてから再度お試しください。'
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'ネットワークエラーが発生しました。インターネット接続を確認してください。'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-40 px-4 sm:pt-24 sm:pb-40 sm:px-6 lg:p-26 lg:pb-40 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-xl font-medium text-gray-900 mb-1">
            お問い合わせ
          </h1>
          <div className="flex items-center justify-center mb-4">
            <div className='w-full h-[1px] bg-black border border-black'></div>
            <p className="text-xl font-medium tracking-[5%] leading-[150%]">Contact</p>
            <div className='w-full h-[1px] bg-black border border-black'></div>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-gray-100 py-[100px] px-2 rounded-2xl lg:p-[100px] sm:py-[100px] sm:px-[24px] font-noto-sans-jp font-semibold text-[20px] lg:text-[24px] sm:text-[24px] tracking-[0%] leading-[100%]">
          {/* Status Message */}
          {status.type !== 'idle' && (
            <div
              className={`mb-6 p-4 rounded text-sm ${status.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : status.type === 'error'
                    ? 'bg-red-50 text-red-800 border border-red-200'
                    : 'bg-blue-50 text-blue-800 border border-blue-200'
                }`}
              role="alert"
              aria-live="polite"
            >
              {status.message}
            </div>
          )}

          <div className="space-y-6">
            {/* Honeypot Field - Hidden from users */}
            <div style={{ display: 'none' }}>
              <label htmlFor="honeypot">Leave this empty</label>
              <input
                type="text"
                id="honeypot"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleInputChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm text-gray-700 mb-2">
                お名前<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="お名前をご入力ください"
                required
                aria-required="true"
                className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                disabled={status.type === 'loading'}
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                メールアドレス<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="メールアドレスをご入力ください"
                required
                aria-required="true"
                className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                disabled={status.type === 'loading'}
              />
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-sm text-gray-700 mb-2">
                電話番号<span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="電話番号をご入力ください"
                className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                disabled={status.type === 'loading'}
              />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm text-gray-700 mb-2">
                お問い合わせ内容<span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="お問い合わせ内容をご入力ください"
                required
                aria-required="true"
                className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 resize-vertical"
                disabled={status.type === 'loading'}
              />
            </div>

            {/* Privacy Policy Checkbox */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="privacyAgreed"
                name="privacyAgreed"
                checked={formData.privacyAgreed}
                onChange={handleInputChange}
                required
                className="mt-1 h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                disabled={status.type === 'loading'}
              />
              <label htmlFor="privacyAgreed" className="ml-2 text-sm text-gray-700">
                プライバシーポリシーに同意する
              </label>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-4">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={status.type === 'loading'}
                className="inline-flex items-center px-8 py-3 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status.type === 'loading' ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    送信中...
                  </>
                ) : (
                  <>
                    詳細確認へ
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;