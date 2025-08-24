"use client";
import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { BlogCard } from '../blog/blogCard';
import { useRouter } from 'next/navigation';
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  thumbnail: string;
  tags: string[];
  createdAt: string;
  content: string;
}


interface BlogCardProps extends BlogPost {
    onClick?: () => void;
}

interface SampleBlogProps {
    onBlogClick?: (slug: string) => void;
    //   onViewAllClick?: () => void;
}

export const SampleBlog: React.FC<SampleBlogProps> = ({
    onBlogClick = (slug: string) => console.log(`Navigate to blog: ${slug}`)
    //   onViewAllClick = () => console.log('View all blogs')
}) => {
    // Sample blog data matching the design
    const router = useRouter();
    
 onBlogClick = (slug: string) => {
    router.push(`/blog/${slug}`);
  }

  const blogPosts: BlogPost[] = [
    {
      id: "figma-tutorial",
      slug: "figma-web-design-tutorial",
      title: "Figmaで始める！効率的なWebサイト設計のコツ",
      thumbnail: "https://images.unsplash.com/photo-1609921141835-710b7fa6e438?w=400&h=300&fit=crop",
      tags: ["Design", "Branding"],
      createdAt: "2025-08-10",
      content: "Figma tutorial content..."
    },
    {
      id: "ui-ux-improvement",
      slug: "ui-ux-business-efficiency",
      title: "UI/UX改善で業務効率を高めるデザイン思考",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      tags: ["IT Consulting", "Engineering", "Branding", "Design"],
      createdAt: "2025-08-05",
      content: "UI/UX improvement content..."
    },
    {
      id: "cloud-system",
      slug: "cloud-next-generation-web-system",
      title: "クラウド活用とデザインの融合で実現する次世代Webシステム",
      thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
      tags: ["IT Consulting", "Engineering", "Design"],
      createdAt: "2025-08-10",
      content: "Cloud system content..."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">ブログ</h2>
          <div className="w-24 h-0.5 bg-gray-300 mx-auto mb-2"></div>
          <p className="text-sm text-gray-500 uppercase tracking-wider">BLOG</p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {blogPosts.map((post) => (
            <BlogCard
              key={post.id}
              {...post}
              onClick={() => onBlogClick(post.slug)}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button
            // onClick={onViewAllClick}
            className="group inline-flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            もっと見る
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

