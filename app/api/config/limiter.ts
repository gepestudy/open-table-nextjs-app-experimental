import { RateLimiter } from "limiter";
import { NextRequest, NextResponse } from "next/server";

const limiter = new RateLimiter({
  tokensPerInterval: 3,
  interval: "min",
  fireImmediately: true,
});

export default async function requestLimiterMiddleware(
  req: NextRequest,
  next: any
) {
  const clientIP =
    req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip");

  console.log({ iniIpnyaya: clientIP });
  next();
}
