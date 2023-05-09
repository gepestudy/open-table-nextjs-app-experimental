import prisma from "@/prisma/prisma";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await prisma.restaurant.deleteMany();
  return NextResponse.json({ message: "success" });
}

export async function POST(request: Request, res: NextApiResponse) {
  return NextResponse.json({ message: "Hello, Next.js! post data" });
}
