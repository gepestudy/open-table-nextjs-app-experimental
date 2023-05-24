import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const requestHeader = new Headers(request.headers);

  const ip = request.ip as string;
  requestHeader.set("x-forwarded-for", ip);
  console.log(ip);
  return NextResponse.next({
    request: {
      headers: requestHeader,
    },
  });
}

export const config = {
  matcher: ["/api/hello"],
};
