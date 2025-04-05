import { auth } from "@/lib/auth";

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/login") {
    const newUrl = new URL("/login", process.env.SERVER_URL);
    return Response.redirect(newUrl);
  } else if (req.auth && req.nextUrl.pathname === "/login") {
    const newUrl = new URL("/", process.env.SERVER_URL);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};