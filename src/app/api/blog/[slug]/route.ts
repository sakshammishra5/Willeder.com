// app/api/blogs/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { data } from '../../../data/data'; // ✅ Keep your actual data source

// Strong typing for blog posts
// Updated Blog Post Data Structure for Japanese Design Blog
interface BlogPost {
  id: number;
  slug: string;
  title: string;
  createdAt: string; // Format: "YYYY.MM.DD" as shown in design
  tags: string[];
  thumbnail: string;
  content: {
    h1Title: string; // Main hero title
    h2Sections: Array<{
      title: string;
      content: string;
      images?: string[];
      diagramData?: any; // For Auto Layout diagrams
    }>;
    h3Sections: Array<{
      title: string;
      content: string;
      isInitialDesign?: boolean; // For styling red text
    }>;
    bodyText: string; // Main introductory paragraph
    blockquote?: string;
    smallText?: string; // For additional notes
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

// ✅ Use type assertion to enforce data shape
const blogPosts: BlogPost[] = data.blogs;

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ slug: string }> } // 🔧 Fixed: params is now Promise
) {
  try {
    // 🔧 Fixed: Await the params
    const { slug } = await context.params;

    // 🔍 Case-insensitive match for robustness
    const blogPost = blogPosts.find(
      (post) => post.slug.toLowerCase() === slug.toLowerCase()
    );

    if (!blogPost) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // 🔗 Related posts by shared tags (excluding current)
    const relatedPosts = blogPosts
      .filter(
        (post) =>
          post.slug !== slug &&
          post.tags.some((tag) => blogPost.tags.includes(tag))
      )
      .slice(0, 3); // Limit to 3 related posts

    return NextResponse.json({
      success: true,
      data: {
        post: blogPost,
        relatedPosts,
      },
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}