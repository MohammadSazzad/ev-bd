import { NextRequest, NextResponse } from "next/server";
import { verifyAuthToken } from "@/lib/auth/jwt";
import { AUTH_COOKIE_NAME } from "@/lib/auth/cookies";

// Define protected route patterns
const PROTECTED_PAGE_PATTERNS = ["/admin"];
const PROTECTED_API_PATTERNS = ["/api/admin"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedPage = PROTECTED_PAGE_PATTERNS.some((prefix) =>
    pathname.startsWith(prefix)
  );
  const isProtectedApi = PROTECTED_API_PATTERNS.some((prefix) =>
    pathname.startsWith(prefix)
  );

  // If not a protected route, continue
  if (!isProtectedPage && !isProtectedApi) {
    return NextResponse.next();
  }

  // Extract auth token
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const payload = token ? await verifyAuthToken(token) : null;

  if (!payload || !payload.sub) {
    if (isProtectedApi) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required to access this resource.",
        },
        { status: 401 }
      );
    }

    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // For admin routes, check if user has ADMIN role
  const isAdminRoute = pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
  const userRoles = Array.isArray(payload.roles) ? payload.roles : [];
  const hasAdminRole = userRoles.includes("ADMIN");

  if (isAdminRoute && !hasAdminRole) {
    if (isProtectedApi) {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden: Administrator privileges required.",
        },
        { status: 403 }
      );
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Forward user context to downstream handlers via headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user-id", payload.sub);
  requestHeaders.set("x-user-email", payload.email || "");
  requestHeaders.set("x-user-roles", JSON.stringify(userRoles));

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
