// app/layout.tsx or app/page.tsx

import ProtectedLayout from "./components/ProtectedLayout";
import MainLayout from "./MainLayout";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedLayout>
      <MainLayout>{children}</MainLayout>
    </ProtectedLayout>
  );
}
