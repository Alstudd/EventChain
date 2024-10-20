import { type NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  console.log(req.nextUrl);
  const res = NextResponse.next();
  res.headers.append("Access-Control-Allow-Origin", "*");
  res.headers.append(
    "Access-Control-Allow-Methods",
    "GET, POST,PUT,PATCH,DELETE, OPTIONS"
  );
  res.headers.append("Access-Control-Allow-Credentials", "true");
  return res;
}

export const config = {
  matcher: ["/api/:path*"],
};
