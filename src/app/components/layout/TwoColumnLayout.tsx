interface TwoColumnLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
  className?: string;
}

export default function TwoColumnLayout({
  left,
  right,
  className = "",
}: TwoColumnLayoutProps) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 ${className}`}>
      <div className="lg:col-span-2 space-y-6">{left}</div>
      <div className="lg:col-span-1 space-y-6">{right}</div>
    </div>
  );
}
