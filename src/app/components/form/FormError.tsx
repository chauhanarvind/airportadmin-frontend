interface FormErrorProps {
  message?: string;
}

export default function FormError({ message }: FormErrorProps) {
  if (!message) return null;
  return <p className="text-sm text-red-500">{message}</p>;
}
