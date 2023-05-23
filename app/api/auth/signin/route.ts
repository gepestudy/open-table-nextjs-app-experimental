import prisma from "@/prisma/prisma";
import { signinScheme } from "../../config/zod/authSchema";
import bcrypt from "bcrypt";
import * as jose from "jose";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  //   validation req body
  const validationResult = signinScheme.safeParse({
    email,
    password,
  });

  if (!validationResult.success) {
    const errors = validationResult.error.flatten();
    return new Response(JSON.stringify({ message: errors }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  //   find user by email
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user)
    return new Response(
      JSON.stringify({ message: "wrong credentials please try again" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid)
    return new Response(
      JSON.stringify({ message: "wrong credentials please try again" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

  // Create and sign a JWT token for the newly created user
  const algo = "HS256"; // Algorithm used in jose package
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const jwt = await new jose.SignJWT({ email: user.email })
    .setProtectedHeader({ alg: algo })
    .setExpirationTime("15m")
    .sign(secret);

  // Return a 200 response with the signed JWT token
  return new Response(JSON.stringify({ jwt }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
