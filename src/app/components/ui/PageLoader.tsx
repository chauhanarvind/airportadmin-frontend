import { Progress } from "@/components/ui/progress";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="w-1/2 max-w-md">
        <Progress value={100} className="h-2 animate-pulse" />
      </div>
    </div>
  );
}
