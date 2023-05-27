import * as jose from "jose";
import { NextResponse } from "next/server";

export default async function withHeaderToken(req: Request) {
  const headersList = req.headers;
  const token = headersList.get("authorization")?.split(" ")[1];

  if (!token) {
    return new NextResponse(
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
    await jose.jwtVerify(token, secret).then(() => {
      NextResponse.next();
    });
  } catch (error) {
    return new NextResponse(
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
