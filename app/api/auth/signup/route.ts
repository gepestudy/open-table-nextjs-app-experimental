import prisma from "@/prisma/prisma";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { NextRequest } from "next/server";
import { signupSchema } from "../../config/zod/authSchema";

interface Body {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  password: string;
}

export async function POST(req: NextRequest) {
  const body: Body = await req.json();

  // Validate the request body against the signup schema
  const validationResult = signupSchema.safeParse({
    ...body,
  });

  // If validation fails, return a 400 response with error message
  if (!validationResult.success) {
    const errors = validationResult.error.flatten();
    return new Response(JSON.stringify({ message: errors }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Check if email is already taken
  const userWithEmail = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (userWithEmail)
    return new Response(
      JSON.stringify({ message: { error: "email already taken" } }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

  // Hash password before creating user
  const hashedPassword = await bcrypt.hash(body.password, 10);

  // Create user in the database
  const user = await prisma.user.create({
    data: {
      first_name: body.firstName,
      last_name: body.lastName,
      email: body.email,
      city: body.city,
      phone: body.phone,
      password: hashedPassword,
    },
  });

  // Create and sign a JWT token for the newly created user
  const algo = "HS256"; // Algorithm used in jose package
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const jwt = await new jose.SignJWT({ email: user.email })
    .setProtectedHeader({ alg: algo })
    .setExpirationTime("15m")
    .sign(secret);

  // Return a 200 response with the signed JWT token
  return new Response(
    JSON.stringify({
      jwt,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      phone: user.phone,
      city: user.city,
    }),
    {
      status: 200,
      headers: new Headers([
        ["Set-Cookie", `jwt=${jwt}; Max-Age=${60 * 60 * 24}; Path=/`],
        ["Content-Type", "application/json"],
      ]),
    }
  );
}
