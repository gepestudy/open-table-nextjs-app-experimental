import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import limiter from "../config/limiter";

export async function GET(request: Request) {
  const remainingLimit = await limiter.removeTokens(1);
  if (remainingLimit < 0)
    return NextResponse.json(
      { message: "Too many requests" },
      {
        status: 429,
        statusText: "too many requests",
        headers: {
          "Content-Type": "application/json",
          "Allow-Control-Allow-Origin": "*",
        },
      }
    );
  return NextResponse.json({
    message: "hello world!",
    remainingLimit,
  });
}

export async function POST(request: Request, res: NextApiResponse) {
  return NextResponse.json({ message: "Hello, Next.js! post data" });
}
