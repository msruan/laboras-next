import { auth } from "@/lib/auth";
import { env } from "./env/server";

export default auth((req) => {
  const loginUrl = new URL("/login", env.SERVER_URL);
  const homeUrl = new URL("/", env.SERVER_URL);

  if (!req.auth && req.nextUrl.pathname !== "/login") {
    return Response.redirect(loginUrl);
  } else if (req.auth && req.nextUrl.pathname === "/login") {
    return Response.redirect(homeUrl);
  }
  return;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
