// app/api/blogs/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { data } from '../../../data/json';
// You'll need to import your blog data from your data/json.js file
// import { blogPosts } from '@/data/json.js'; // Adjust path as needed

// Sample blog data structure - replace this with your actual data import
const blogPosts = [
 ...data.blogs
];

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  thumbnail: string;
  tags: string[];
  createdAt: string;
  content: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    
    // Find the blog post by slug
    const blogPost = blogPosts.find(post => post.slug === slug);
    
    if (!blogPost) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    // Get related posts (same tags, excluding current post)
    const relatedPosts = blogPosts
      .filter(post => 
        post.slug !== slug && 
        post.tags.some(tag => blogPost.tags.includes(tag))
      )
      .slice(0, 3); // Limit to 3 related posts
    
    return NextResponse.json({
      success: true,
      data: {
        post: blogPost,
        relatedPosts
      }
    });
    
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}