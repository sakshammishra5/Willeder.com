
import React from 'react';
import { Calendar } from 'lucide-react';

interface BlogCardProps {
  id: string;
  slug: string;
  title: string;
  thumbnail: string;
  tags: string[];
  createdAt: string;
  content: string;
  onClick?: () => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  id,
  slug,
  title,
  thumbnail,
  tags,
  createdAt,
  content,
  onClick
}) => {
  // Format date to match the design (YYYY.MM.DD)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  // Get tag colors based on tag name
  const getTagColor = (tag: string) => {
    const colorMap: { [key: string]: string } = {
      'IT Consulting': 'bg-gray-200 text-gray-700',
      'Engineering': 'bg-gray-200 text-gray-700',
      'Branding': 'bg-black text-white',
      'Design': 'bg-black text-white',
      'Other': 'bg-gray-200 text-gray-700',
      'sample': 'bg-gray-200 text-gray-700',
      'replace-me': 'bg-black text-white'
    };
    return colorMap[tag] || 'bg-gray-200 text-gray-700';
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 max-w-sm"
      onClick={onClick}
    >
      {/* Header with thumbnail */}
      <div className="relative">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-48 object-cover"
        />
        
        {/* Dark overlay with Figma-style branding */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className="absolute bottom-4 left-4">
            {/* Figma logo representation */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-purple-500 rounded-full -ml-1"></div>
              </div>
              <div className="flex">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full -ml-1"></div>
              </div>
              <span className="text-white font-semibold text-lg ml-2">Figma</span>
            </div>
            
            {/* Japanese text */}
            <div className="text-white">
              <p className="text-sm font-medium">初心者向け！</p>
              <p className="text-xs">実例で学ぶFigmaの使い方</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Date */}
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(createdAt)}</span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-gray-900 text-lg leading-tight line-clamp-2">
          {title}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`px-3 py-1 text-xs font-medium rounded-full ${getTagColor(tag)}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};