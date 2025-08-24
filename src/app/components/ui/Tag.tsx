// components/ui/Tag.tsx
interface TagProps {
  label: string;
}

export function Tag({ label }: TagProps) {
  return <span className="text-sm bg-gray-200 px-2 py-1 rounded">{label}</span>;
}