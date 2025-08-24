// components/layout/Container.tsx
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full',
        'min-[320px]:max-w-[320px] min-[768px]:max-w-[768px] min-[1440px]:max-w-[1200px]',
        'px-[clamp(16px,calc(100vw/1440*32),32px)]',
        className
      )}
    >
      {children}
    </div>
  );
}