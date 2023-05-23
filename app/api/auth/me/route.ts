import { headers } from "next/headers";
import * as jose from "jose";
import prisma from "@/prisma/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

export async function POST(req: Request) {
  const headersList = headers();
  const token = headersList.get("authorization")?.split(" ")[1];

  if (!token) {
    return new Response(
      JSON.stringify({ message: "Unauthorized (token not provided)" }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    await jose.jwtVerify(token, secret);
    const decodedToken: { email?: string; exp?: number } =
      jose.decodeJwt(token);
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
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Unauthorized (invalid token)" }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
