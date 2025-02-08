import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const imagesApiHost = process.env.IMAGES_API_HOST;

export function middleware(request: NextRequest) {
  if (!imagesApiHost) {
    throw new Error("Missing required environment variable IMAGES_API_HOST");
  }
  const paths = request.url.match(/\/static\/.+/);
  const path = paths ? paths[0] : "";
  return NextResponse.redirect(new URL(`${imagesApiHost}${path}`, request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/images/:path*",
};
