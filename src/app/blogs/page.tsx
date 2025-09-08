"use client";
import React, { Suspense, useEffect, useState } from 'react';
import { Calendar, Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BlogCard } from '../components/blog/BlogCard';

interface BlogPost {
  id: number; 
  slug: string;
  title: string;
  thumbnail: string;
  tags: string[];
  createdAt: string;
  content: string;
}

// Remove the custom props interface since this is a page component
const BlogsPageContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('ALL');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [availableTags, setAvailableTags] = useState<string[]>(['ALL','It Consulting','Design','Branding','Engineering','Other']);

  // Get initial values from URL params
  useEffect(() => {
    const tag = searchParams.get('tag') || searchParams.get('tags_like') || 'ALL';
    const q = searchParams.get('q') || '';
    
    setSelectedTag(tag);
    setSearchTerm(q);
  }, [searchParams]);

  // Handle blog click - always navigate to blog page
  const handleBlogClick = (slug: string) => {
    router.push(`/blog/${slug}`);
  };

  // Fetch blogs from API
  const fetchBlogs = async (tag: string = 'ALL', query: string = '') => {
    console.log('Fetching blogs with params:', { tag, query });
    setLoading(true);
    setError(null);
    
    try {
      // Build query parameters
      const params = new URLSearchParams({
        _limit: '100', // Get all posts
        include_meta: 'true'
      });

      // Add tag filter
      if (tag !== 'ALL') {
        params.set('tags_like', tag);
      }

      // Add search query
      if (query) {
        params.set('q', query);
      }

      console.log('API URL:', `/api/blogs?${params.toString()}`);
      const response = await fetch(`/api/blogs?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('API Response:', result);
      
      // Handle response format
      if (Array.isArray(result)) {
        setBlogPosts(result);
        // Extract unique tags for filter
        // const allTags = Array.from(new Set(result.flatMap((post: BlogPost) => post.tags)));
        // setAvailableTags(['ALL', ...allTags]);
      } else if (result.data) {
        setBlogPosts(result.data);
        // Fetch all available tags separately
        await fetchAvailableTags();
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setBlogPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all available tags
  const fetchAvailableTags = async () => {
    try {
      console.log('Fetching available tags...');
      const response = await fetch('/api/blogs?_limit=1000');
      if (response.ok) {
        const allPosts = await response.json();
        console.log('All posts for tags:', allPosts);
        if (Array.isArray(allPosts)) {
          const tags = Array.from(new Set(allPosts.flatMap((post: BlogPost) => post.tags)));
          setAvailableTags(['ALL', ...tags]);
          console.log('Available tags:', ['ALL', ...tags]);
        }
      }
    } catch (error) {
      console.error('Error fetching tags:', error);
      // Fallback tags
      setAvailableTags(['ALL', 'IT Consulting', 'Engineering', 'Branding', 'Design', 'Other']);
    }
  };

  // Initial load
  useEffect(() => {
    const initialTag = searchParams.get('tag') || searchParams.get('tags_like') || 'ALL';
    const initialQuery = searchParams.get('q') || '';
    fetchBlogs(initialTag, initialQuery);
  }, []);

  // Update URL and fetch when filters change
  const updateFiltersAndFetch = (newTag: string = selectedTag, newQuery: string = searchTerm) => {
    const params = new URLSearchParams();
    
    if (newTag !== 'ALL') params.set('tags_like', newTag);
    if (newQuery) params.set('q', newQuery);
    
    const newUrl = params.toString() ? `?${params.toString()}` : '';
    router.push(newUrl, { scroll: false });
    
    fetchBlogs(newTag, newQuery);
  };

  // Handle search
  const handleSearch = () => {
    if (searchTerm==="") return;
    console.log('Searching for:', searchTerm);
    setSelectedTag('ALL');
    updateFiltersAndFetch('ALL', searchTerm);
  };

  // Handle tag change
  const handleTagChange = (tag: string) => {
    console.log('Tag changed to:', tag);
    setSelectedTag(tag);
    setSearchTerm('');
    updateFiltersAndFetch(tag, '');
  };

  // Handle search input key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">エラーが発生しました</p>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => fetchBlogs(selectedTag, searchTerm)}
            className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            再試行
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-4 py-16 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-12 relative w-full max-w-7xl">
        <h2 className="mx-auto w-full h-[48px] text-[32px] font-bold tracking-[5%] leading-[150%] text-gray-900 mb-2">ブログ</h2>
        <div className='w-full flex items-center justify-center gap-[10px]'>
          <div className='w-full h-[1px] bg-black border border-black'></div>
          <p className="text-xl font-medium  tracking-[5%] leading-[150%]">BLOG</p>
          <div className='w-full h-[1px] bg-black border border-black '></div>
        </div>
      </div>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative w-full lg:w-[753px] sm:w-full  mx-auto">
            <input
              type="text"
              placeholder="キーワードを入力"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full pl-4 pr-12 py-3 bg-[#F2F4F1] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent "
            />
            <button 
              onClick={handleSearch}
              className="absolute right-0 top-0 h-full px-4 bg-black text-white rounded-r-lg hover:bg-gray-800 transition-colors"
            >
              <div className='flex gap-2 items-center justify-center py-[10px] px-4'>
              検索
              <Search className="w-5 h-5" />
              </div>
            </button>
          </div>

          {/* Tag Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagChange(tag)}
                className={`px-3 py-1 text-sm font-jost tracking-[10%]  font-medium rounded border transition-colors ${
                  selectedTag === tag
                    ? 'bg-white text-black border-black'
                    : 'bg-white text-[#B9BDC6] border-[#B9BDC6] hover:bg-gray-50'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Active Filters Display */}
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            {searchTerm && (
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                検索: "{searchTerm}"
              </div>
            )}
            {selectedTag !== 'ALL' && (
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                タグ: {selectedTag}
              </div>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
            <span className="ml-2 text-gray-600">読み込み中...</span>
          </div>
        )}

        {/* Blog Grid */}
        {!loading && (
          <div className="grid gap-6 grid-cols-1 place-self-center sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <BlogCard
                key={post.id}
                {...post}
                onClick={() => handleBlogClick(post.slug)}
              />
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && blogPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">該当するブログ記事が見つかりませんでした。</p>
            <p className="text-gray-400 text-sm mt-2">検索条件を変更してお試しください。</p>
          </div>
        )}

      </div>
    </div>
  );
};

// Loading component for Suspense fallback
const BlogsLoading = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
      <p className="text-gray-600">読み込み中...</p>
    </div>
  </div>
);

// Main page component with Suspense boundary
const BlogsPage: React.FC = () => {
  return (
    <Suspense fallback={<BlogsLoading />}>
      <BlogsPageContent />
    </Suspense>
  );
};

export default BlogsPage;