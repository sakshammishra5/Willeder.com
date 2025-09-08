// app/api/blogs/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { data } from '../../data/data';

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

export async function GET(request: NextRequest) {
  try {
    console.log("🚀 Blogs API Hit");
    
    const { searchParams } = new URL(request.url);
    
    // Map frontend parameters to JSON Server format
    const _page = parseInt(searchParams.get('page') || searchParams.get('_page') || '1');
    const _limit = parseInt(searchParams.get('limit') || searchParams.get('_limit') || '10');
    const tags_like = searchParams.get('tag') || searchParams.get('tags_like') || '';
    const q = searchParams.get('q') || ''; // LIKE search query
    
    let filteredPosts: BlogPost[] = [...data.blogs];
    
    // Apply LIKE search filter (searches in title, content, and tags)
    if (q) {
      const searchQuery = q.toLowerCase();
      filteredPosts = filteredPosts.filter(post =>
        post.content.h1Title.toLowerCase().includes(searchQuery) ||
        post.content.h2Sections[1].content.toLowerCase().includes(searchQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery))
      );
    }
    
    // Apply tags_like filter (OR filter - matches any tag containing the search term)
    if (tags_like && tags_like !== 'ALL') {
      const tagQuery = tags_like.toLowerCase();
      filteredPosts = filteredPosts.filter(post =>
        post.tags.some(tag => tag.toLowerCase().includes(tagQuery))
      );
    }
    
    // Sort by creation date (newest first)
    filteredPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    // Calculate pagination
    const totalPosts = filteredPosts.length;
    const totalPages = Math.ceil(totalPosts / _limit);
    const startIndex = (_page - 1) * _limit;
    const endIndex = startIndex + _limit;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
    
    // For development compatibility, also return metadata in body if requested
    if (searchParams.get('include_meta') === 'true') {
      return NextResponse.json({
        data: paginatedPosts,
        meta: {
          pagination: {
            page: _page,
            limit: _limit,
            total: totalPosts,
            totalPages,
            hasNext: _page < totalPages,
            hasPrev: _page > 1
          },
          filters: {
            q,
            tags_like,
          }
        }
      });
    }
    
    // JSON Server compatible response format
    const response = NextResponse.json(paginatedPosts);
    
    // Add pagination headers (JSON Server style)
    response.headers.set('X-Total-Count', totalPosts.toString());
    response.headers.set('Access-Control-Expose-Headers', 'X-Total-Count');
    
    return response;
    
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}