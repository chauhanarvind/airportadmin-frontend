import AppSelect from "@/app/components/ui/AppSelect";

interface SelectInputProps {
  label: string;
  name: string;
  apiUrl?: string;
  optionKey?: string;
  required?: boolean;
  staticOptions?: string[];
}

export default function SelectInput(props: SelectInputProps) {
  return <AppSelect {...props} />;
}
