// app/contact/page.tsx
'use client';

import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
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
    message: '',
    honeypot: ''
  });

  const [status, setStatus] = useState<FormStatus>({
    type: 'idle',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
          message: '',
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-4 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="bg-white border-2 border-dashed border-blue-300 rounded-lg p-4 sm:p-6 mb-6 text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
            お問い合わせ
          </h1>
          <div className="flex items-center justify-center">
            <div className="flex-1 h-px bg-blue-300"></div>
            <p className="px-4 text-xs sm:text-sm text-gray-600 uppercase tracking-widest">
              CONTACT
            </p>
            <div className="flex-1 h-px bg-blue-300"></div>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-gray-100 border-2 border-dashed border-blue-300 rounded-lg p-4 sm:p-6 lg:p-8">
          {/* Status Message */}
          {status.type !== 'idle' && (
            <div
              className={`mb-6 p-4 rounded-md text-sm ${
                status.type === 'success'
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
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                お名前 <span className="text-red-500" aria-label="必須">*</span>
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
                aria-describedby="name-error"
                className="w-full px-3 py-2.5 sm:py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                disabled={status.type === 'loading'}
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                メールアドレス <span className="text-red-500" aria-label="必須">*</span>
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
                aria-describedby="email-error"
                className="w-full px-3 py-2.5 sm:py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                disabled={status.type === 'loading'}
              />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                お問い合わせ内容 <span className="text-red-500" aria-label="必須">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="お問い合わせ内容をご入力ください"
                required
                aria-required="true"
                aria-describedby="message-error"
                className="w-full px-3 py-2.5 sm:py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical text-sm sm:text-base"
                disabled={status.type === 'loading'}
              />
            </div>

            {/* Submit Button */}
            <div className="text-center pt-4">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={status.type === 'loading'}
                className="inline-flex items-center px-8 py-3 sm:px-12 sm:py-4 bg-red-600 text-white text-sm sm:text-base font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-describedby="submit-status"
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
                    送信する
                    <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-xs sm:text-sm text-gray-500">
            お問い合わせいただいた内容につきましては、2営業日以内にご返信いたします。
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;