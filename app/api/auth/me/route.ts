import prisma from "@/prisma/prisma";
import * as jose from "jose";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const headersList = headers();
  const token = headersList.get("authorization")?.split(" ")[1] as string;

  const decodedToken: { email?: string; exp?: number } = jose.decodeJwt(token);
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedToken.email,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      city: true,
      phone: true,
      email: true,
      created_at: true,
      updated_at: true,
    },
  });

  if (!user)
    return new Response(
      JSON.stringify({ message: "Unauthorized (user not found)" }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

  return new Response(JSON.stringify({ message: user }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
