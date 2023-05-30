import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest, NextResponse } from "next/server";
import withHeaderToken from "./src/middleware/withHeader";
import { useAppDispatch, useAppSelector } from "./src/redux/store";
import { setAuthState } from "./src/redux/features/authSlicer";

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
