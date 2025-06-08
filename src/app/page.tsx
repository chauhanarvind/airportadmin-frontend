import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  sub: string;
  role: string;
  exp: number;
  userId: number;
};

export default async function Home() {
  const cookieStore = await cookies(); // ⬅️ await is required in Next.js 15+
  const token = cookieStore.get("token")?.value;

  if (token) {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const now = Date.now() / 1000;

      if (decoded.exp > now) {
        redirect("/features");
      }
    } catch {
      // Ignore decode errors and fall through to login prompt
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold text-blue-700 mb-2">
        Welcome to Airport Admin
      </h1>
      <p className="text-gray-600">
        Please{" "}
        <a href="/login" className="text-blue-500 underline">
          log in
        </a>{" "}
        to continue.
      </p>
    </div>
  );
}
