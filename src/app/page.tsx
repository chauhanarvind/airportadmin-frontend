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
  const cookieStore = await cookies(); // await here
  const token = cookieStore.get("token")?.value;

  if (token) {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const now = Date.now() / 1000;

      if (decoded.exp > now) {
        redirect("/features");
      }
    } catch {
      // fall through to login
    }
  }

  redirect("/login");
}
