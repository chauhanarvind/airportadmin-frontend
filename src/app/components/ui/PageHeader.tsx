interface PageHeaderProps {
  title: string;
  actions?: React.ReactNode;
  className?: string;
}

export default function PageHeader({
  title,
  actions,
  className = "",
}: PageHeaderProps) {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${className}`}
    >
      <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}
