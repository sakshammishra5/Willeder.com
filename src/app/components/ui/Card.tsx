// components/ui/Card.tsx
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface CardProps {
  title: string;
  thumbnail: string;
  date: string;
  tags: string[];
  className?: string;
}

export function Card({ title, thumbnail, date, tags, className }: CardProps) {
  return (
    <article className={cn('border rounded-lg overflow-hidden', className)}>
      <Image
        src={thumbnail}
        alt={title}
        width={1200}
        height={630}
        sizes="(max-width: 768px) 100vw, 33vw"
        className="aspect-[1200/630]"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-600">{new Date(date).toLocaleDateString()}</p>
        <div className="flex gap-2 mt-2">
          {tags.map((tag) => (
            <span key={tag} className="text-sm bg-gray-200 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}