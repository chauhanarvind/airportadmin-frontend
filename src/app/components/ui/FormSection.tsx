import React from "react";

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export default function FormSection({
  title,
  description,
  children,
  className = "",
}: FormSectionProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {children}
      </div>
    </div>
  );
}
