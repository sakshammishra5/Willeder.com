"use client";
import React, { useEffect, useState } from 'react';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  thumbnail: string;
  tags: string[];
  createdAt: string;
  content: string;
}

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ params }) => {
  const router = useRouter();
  const { slug } = React.use(params); // Unwrap the params Promise
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blog post by slug
  const fetchBlogPost = async (slug: string) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Fetching blog post with slug:', slug);
      const response = await fetch(`/api/blog/${slug}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('ブログ記事が見つかりませんでした');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const post = await response.json();
      console.log('Fetched blog post:', post);
      setBlogPost(post.data.post);
    } catch (err) {
      console.error('Error fetching blog post:', err);
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  // Estimate reading time
  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200; // Average reading speed
    const textLength = content.replace(/<[^>]*>/g, '').length;
    const words = textLength / 3; // Rough estimate for Japanese characters
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  // Handle share functionality
  const handleShare = async () => {
    if (navigator.share && blogPost) {
      try {
        await navigator.share({
          title: blogPost.title,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('URLをクリップボードにコピーしました');
    }
  };

  useEffect(() => {
    fetchBlogPost(slug);
  }, [slug]);

  // Add this check early in your component, before the JSX return
if (!blogPost) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
        <p className="text-gray-600">読み込み中...</p>
      </div>
    </div>
  );
}

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
          <span className="ml-2 text-gray-600">読み込み中...</span>
        </div>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-4 py-4 max-w-4xl">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              戻る
            </button>
            <button
              onClick={handleShare}
              className="flex items-center text-gray-600 hover:text-black transition-colors"
            >
              <Share2 className="w-5 h-5 mr-2" />
              シェア
            </button>
          </div>
        </div>
      </div>

      <article className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-4 py-8 max-w-4xl">
        {/* Featured Image */}
        <div className="relative w-full h-64 md:h-80 lg:h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={blogPost.thumbnail}
            alt={blogPost.title}
            fill
            className="object-cover"
            priority
          />
          
          {/* Overlay with title for mobile */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden">
            <div className="absolute bottom-4 left-4 right-4">
              <h1 className="text-white text-xl font-bold leading-tight">
                {blogPost.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Article Header */}
        <header className="mb-8">
          {/* Title (hidden on mobile, shown on desktop) */}
          <h1 className="hidden md:block text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {blogPost.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{formatDate(blogPost.createdAt)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>{estimateReadingTime(blogPost.content)}分で読める</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {blogPost.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Article Content */}
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          <div 
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:shadow-md"
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
          />
        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <button
              onClick={() => router.push('/blog')}
              className="flex items-center text-gray-600 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              ブログ一覧に戻る
            </button>
            <button
              onClick={handleShare}
              className="flex items-center px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
            >
              <Share2 className="w-5 h-5 mr-2" />
              この記事をシェア
            </button>
          </div>
        </div>

      </article>
    </div>
  );
};

export default BlogDetailPage;