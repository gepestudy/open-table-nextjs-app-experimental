import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return new Response("Hello, Next.js!");
}

export async function POST(request: Request, res: NextApiResponse) {
  return NextResponse.json({ message: "Hello, Next.js! post data" });
}