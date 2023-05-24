import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import limiter from "../config/limiter";
import requestLimiterMiddleware from "../config/limiter";

export async function GET(request: NextRequest) {
  requestLimiterMiddleware(request, () => {
    return NextResponse.json({
      message: "hello world!",
    });
  });
}

export async function POST(request: Request, res: NextApiResponse) {
  return NextResponse.json({ message: "Hello, Next.js! post data" });
}
