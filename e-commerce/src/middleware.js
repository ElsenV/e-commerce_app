import { NextResponse } from "next/dist/server/web/spec-extension/response";
import { verifyToken } from "./lib/auth.js";

export async function middleware(req) {
  const token = req.cookies.get("Auth")?.value;

  const verifiedToken =
    token &&
    (await verifyToken(token).catch((err) => {
      console.log(err);
    }));

  if (verifiedToken && req.nextUrl.pathname.startsWith("/auth/login")) {
    return NextResponse.redirect(new URL("/cartlists", req.url));
  }

  if (verifiedToken && req.nextUrl.pathname.startsWith("/auth/register")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!verifiedToken && req.nextUrl.pathname.startsWith("/about")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (!verifiedToken && req.nextUrl.pathname.startsWith("/cartlists")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (!verifiedToken && req.nextUrl.pathname.startsWith("/addinfo")) {
    return NextResponse.redirect(new URL("/auth/register", req.url));
  }
}

export const config = {
  matcher: [
    "/cartlists",
    "/auth/login",
    "/auth/register",
    "/addinfo/{:name}",
    "/about/{:username}",
  ],
};
