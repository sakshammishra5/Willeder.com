export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-[60px] md:pt-[80px]">
      {children}
    </div>
  );
}