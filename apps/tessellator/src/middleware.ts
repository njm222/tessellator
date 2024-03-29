import { loginUser } from "@tessellator/core";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.cookies.get("refreshToken")) {
    return NextResponse.next();
  }

  const accessToken = request.nextUrl.searchParams.get("access_token");
  const refreshToken = request.nextUrl.searchParams.get("refresh_token");

  if (accessToken && refreshToken) {
    const response = NextResponse.next();

    response.cookies.set({
      name: "accessToken",
      value: accessToken,
      path: "/",
      sameSite: "strict",
      maxAge: 1800,
    });
    response.cookies.set({
      name: "refreshToken",
      value: refreshToken,
      path: "/",
      sameSite: "strict",
    });

    return response;
  }

  const { uri } = await loginUser();
  return NextResponse.redirect(decodeURI(uri));
}

export const config = {
  matcher: ["/visualizer"],
};
