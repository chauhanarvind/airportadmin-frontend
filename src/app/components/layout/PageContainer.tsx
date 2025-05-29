interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageContainer({
  children,
  className = "",
}: PageContainerProps) {
  return (
    <div
      className={`max-w-6xl mx-auto px-4 md:px-6 lg:px-10 py-6 space-y-6 ${className}`}
    >
      {children}
    </div>
  );
}
