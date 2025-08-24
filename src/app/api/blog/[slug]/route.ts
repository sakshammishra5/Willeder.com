// app/api/blogs/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { data } from '../../../data/json'; // ✅ Keep your actual data source

// Strong typing for blog posts
interface BlogPost {
  id: number; // 🔧 Fixed: Changed from string to number to match your data
  slug: string;
  title: string;
  thumbnail: string;
  tags: string[];
  createdAt: string;
  content: string;
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