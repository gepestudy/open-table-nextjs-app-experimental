import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest, NextResponse } from "next/server";
import withHeaderToken from "./src/middleware/withHeader";

function matchPathName(url: NextURL, PathnNames: string[]) {
  return PathnNames.some((path) => url.pathname.startsWith(path));
}

export async function middleware(request: NextRequest, res: any) {
  const url = request.nextUrl.clone();

  // check header with token and verify jwt
  if (matchPathName(url, ["/api/hello", "/api/auth/me"])) {
    return withHeaderToken(request);
  }

  return NextResponse.next();
}
