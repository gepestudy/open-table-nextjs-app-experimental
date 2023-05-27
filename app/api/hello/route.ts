import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: "hello world!",
  });
}

export async function POST(request: Request, res: NextApiResponse) {
  return NextResponse.json({ message: "Hello, Next.js! post data" });
}
