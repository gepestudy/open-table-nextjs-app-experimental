import prisma from "@/prisma/prisma";
import * as jose from "jose";
import { headers } from "next/headers";

export async function GET(req: Request) {
  const headersList = headers();
  const token = headersList.get("authorization")?.split(" ")[1] as string;

  try {
    const decodedToken: { email?: string; exp?: number } =
      jose.decodeJwt(token);
    console.log({ decodedToken });

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
    return new Response(
      JSON.stringify({
        firstName: user.first_name,
        lastName: user.last_name,
        city: user.city,
        phone: user.phone,
        email: user.email,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log({ error });

    return new Response(
      JSON.stringify({ message: "Unauthorized (user not found)" }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
