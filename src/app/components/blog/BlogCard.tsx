
import React, { useState } from 'react';

interface BlogCardProps {
  id: number;
  slug: string;
  title: string;
  thumbnail: string;
  tags: string[];
  createdAt: string;
  content: string | {
    h1Title: string;
    h2Sections: { 
      title: string; 
      content: string; 
      images?: string[]; 
      diagramData?: any; 
    }[];
    h3Sections: { 
      title: string; 
      content: string; 
      isInitialDesign?: boolean; 
    }[];
    conclusionText: string;
    // Add other properties as needed
  };
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
  const [allTag,setAllTag]=useState(['It Consulting','Design','Branding','Engineering','Other']);

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
    if(tags.includes(tag)){
      return 'border border-black text-black';
    }
    return 'border border-[#B9BDC6] text-[#B9BDC6]';
  };

return (
<div 
  className="w-full max-w-[343px] sm:max-w-[350px] lg:max-w-[420px] flex flex-col gap-6 bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer max-h-[520px]"
  onClick={onClick}
>
  {/* Header with thumbnail */}
  <div className="relative aspect-[4/3] w-full">
    <img 
      src={thumbnail} 
      alt={title}
      className="w-full h-full object-cover"
    />   
  </div>

  {/* Content */}
  <div className="px-2 pt-1 pb-4 flex flex-col gap-6">
    <div className='flex flex-col gap-1'>
      {/* Date */}
      <div className="flex items-center gap-2 text-[#737B8C] text-sm font-semibold font-jost">
        <span>{formatDate(createdAt)}</span>
      </div>

      {/* Title */}
      <h3 className="font-bold font-noto-sans-jp text-black text-2xl leading-[150%] tracking-[5%] line-clamp-2">
        {title}
      </h3>
    </div>

    {/* Tags */}
    <div className="box-border font-jost w-full flex justify-start flex-wrap gap-1">
      {allTag.map((tag, index) => (
        <span
          key={index}
          className={`flex justify-center items-center h-[22px] px-4 text-xs font-medium rounded-[4px] ${getTagColor(tag)}`}
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
</div>
);

};