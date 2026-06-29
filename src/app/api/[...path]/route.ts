import { NextRequest, NextResponse } from "next/server";

const BACKEND_API_URL = process.env.BACKEND_API_URL || "https://backend.arivoai.in/api";

async function handleProxy(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const pathStr = params.path.join("/");
    
    // Normalize target URL (ensure it has the /api suffix)
    let targetBase = BACKEND_API_URL.replace(/\/$/, "");
    if (!targetBase.endsWith("/api")) {
      targetBase = `${targetBase}/api`;
    }
    
    const searchParams = request.nextUrl.search;
    const targetUrl = `${targetBase}/${pathStr}${searchParams}`;

    // Prepare headers to forward
    const headers = new Headers();
    request.headers.forEach((value, key) => {
      // Filter out connection, content-length, host and accept-encoding to prevent network/security issues
      const k = key.toLowerCase();
      if (
        k !== "host" &&
        k !== "connection" &&
        k !== "content-length" &&
        k !== "accept-encoding"
      ) {
        headers.set(key, value);
      }
    });

    // Determine request method
    const method = request.method;
    const hasBody = ["POST", "PUT", "PATCH", "DELETE"].includes(method);
    let body: any = null;

    if (hasBody) {
      const contentType = request.headers.get("content-type") || "";
      if (contentType.includes("application/json") || contentType.includes("text/")) {
        body = await request.text();
      } else {
        body = request.body;
      }
    }

    // Forward the request to the backend server
    const response = await fetch(targetUrl, {
      method,
      headers,
      body,
      // @ts-ignore (ignore Next-specific fetch type warnings)
      duplex: hasBody ? "half" : undefined,
    });

    // Prepare headers to return to the client
    const responseHeaders = new Headers();
    response.headers.forEach((value, key) => {
      const k = key.toLowerCase();
      // Filter out transfer-encoding/content-encoding to let Next.js handle payload encoding
      if (k !== "transfer-encoding" && k !== "content-encoding") {
        responseHeaders.set(key, value);
      }
    });

    const responseBody = await response.arrayBuffer();

    return new NextResponse(responseBody, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("BFF Proxy Error:", error);
    return NextResponse.json(
      { success: false, data: null, error: "Internal Gateway Error" },
      { status: 502 }
    );
  }
}

export async function GET(req: NextRequest, context: { params: { path: string[] } }) {
  return handleProxy(req, context);
}

export async function POST(req: NextRequest, context: { params: { path: string[] } }) {
  return handleProxy(req, context);
}

export async function PUT(req: NextRequest, context: { params: { path: string[] } }) {
  return handleProxy(req, context);
}

export async function PATCH(req: NextRequest, context: { params: { path: string[] } }) {
  return handleProxy(req, context);
}

export async function DELETE(req: NextRequest, context: { params: { path: string[] } }) {
  return handleProxy(req, context);
}
