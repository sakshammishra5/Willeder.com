"use client";
import { BlogCard } from '@/app/components/blog/BlogCard';
import { SampleBlog } from '@/app/components/sampleBlog/SampleBlog';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  createdAt: string;
  tags: string[];
  thumbnail: string;
  content: {
    h1Title: string;
    h2Sections: Array<{
      title: string;
      content: string;
      images?: string[];
      diagramData?: any;
    }>;
    h3Sections: Array<{
      title: string;
      content: string;
      isInitialDesign?: boolean;
    }>;
    bodyText: string;
    blockquote?: string;
    smallText?: string;
    additionalImages?: string[];
    commentSection?: {
      enabled: boolean;
      sampleComments?: Array<{
        author: string;
        message: string;
        timestamp: string;
      }>;
    };
    conclusionTitle: string;
    conclusionText: string;
  };
}

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ params }) => {
  const router = useRouter();
  const { slug } = React.use(params); // Unwrap the params Promise
  const [post, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[] | null>(null);
  const [allTag, setAllTag] = useState(['It Consulting', 'Design', 'Branding', 'Engineering', 'Other']);

  // Get tag colors based on tag name
  const getTagColor = (tag: string) => {
    if (!post) return 'border border-[#B9BDC6] text-[#B9BDC6]';
    if (post.tags.includes(tag)) {
      return 'border border-black text-black';
    }
    return 'border border-[#B9BDC6] text-[#B9BDC6]';
  };

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
      setRelatedPosts(post.data.relatedPosts)
    } catch (err) {
      console.error('Error fetching blog post:', err);
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogPost(slug);
  }, [slug]);

  // Handle blog click - always navigate to blog page
  const handleBlogClick = (slug: string) => {
    router.push(`/blog/${slug}`);
  };


  if (!post) {
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
    <div className="min-h-screen bg-[#F1F2F4] pt-[48px] px-[16px] pb-[160px] sm:px-[32px] sm:pt-[48px] sm:pb-[160px] lg:px-[80px] lg:pt-[48px] lg:pb-[160px] mt-[-20px] font-noto-sans-jp">
      {/* Article Container */}
      <div className="max-w-7xl mx-auto  bg-white rounded-lg">

        {/* Title Section */}
        <div className="px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <h1 className="text-[32px] tracking-[5%] leading-[150%] sm:text-[48px]  lg:text-[48px] font-bold text-black mb-4 ">
            {post.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-3 text-xs text-gray-500 mb-6 md:mb-8">
            <span className="shrink-0">{post.createdAt}</span>
            <div className="flex flex-wrap gap-1">
              {allTag.map((tag, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 border border-gray-300 rounded text-xs bg-white shrink-0 ${getTagColor(tag)}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ThumbNail */}
        <div className="mb-6 md:mb-8">
          <img className='w-full' srcSet={post.thumbnail} alt="" />
        </div>

        {/* blog detail */}
        <div className='px-2 sm:px-6 '>
          {/* Body Text */}
          <div className="px-4 sm:px-6 lg:px-8 mb-6 md:mb-8">
            <p className="text-black leading-[150%] tracking-[0px] font-medium text-[16px] pt-8 md:text-base">
              {post.content.bodyText}
            </p>
          </div>

          {/* H2 Sections */}
          {post.content.h2Sections.map((section, index) => (
            <div key={index} className="px-4 sm:px-6 lg:px-8 mb-8 md:mb-12">
              {/* Section Title with Red Border */}
              <div className="border-l-4 border-[#AD002D] pl-3 md:pl-4 mb-4 md:mb-6">
                <h2 className="text-[24px] sm:text-[32px] lg:text-[32px] font-bold text-black leading-[150%] tracking-[5%]">
                  {section.title}
                </h2>
              </div>

              {/* Section Images */}
              {section.images && section.images.map((image, imgIndex) => (
                <div key={imgIndex} className="mb-4 md:mb-6 pt-8 sm:pt-4 lg:pt-4">
                  <img
                    srcSet={image}
                    alt={section.title}
                    className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover rounded-2xl"
                  />
                  <p className="text-xs text-gray-500 mt-2">Figmaのコンポーネント画面例</p>
                </div>
              ))}

              <p className="text-gray-700 leading-relaxed text-sm md:text-base mb-4 md:mb-6">
                {section.content}
              </p>

            </div>
          ))}

          {/* Conclusion Section */}
          <div className="px-4 sm:px-6 lg:px-8 mb-8 md:mb-12">
            <div className="border-l-4 border-red-500 pl-3 md:pl-4 mb-4 md:mb-6">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-black">
                {post.content.conclusionTitle}
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
              {post.content.conclusionText}
            </p>
          </div>
          {/* Bottom Padding */}
          <div className="h-6 md:h-8"></div>
        </div>
      </div>

      <div className='pt-16'>
        <p className='flex justify-center items-center text-[24px] font-bold tracking-[5%] leading-[150%]'>おすすめの記事</p>
        <div className='w-full gap-6 sm:gap-5 lg:gap-6 flex flex-wrap  items-center justify-center lg:grid lg:grid-cols-3  max-w-7xl  mb-12 mt-12 mx-auto'>
          {relatedPosts && relatedPosts.map((relatedPost) => (
            <BlogCard
              key={relatedPost.id}
              {...relatedPost}
              onClick={() => handleBlogClick(relatedPost.slug)}
            />
          ))}
        </div>

        <div 
        className='w-[120px] flex ml-auto cursor-pointer'
        onClick={() => router.push('/blogs')}
        >
          <p className='w-full'> もっと見る</p>
          <img className='h-full' srcSet="/arrow2.png" alt="" />
        </div>
      </div>

    </div>
  );
};

export default BlogDetailPage;