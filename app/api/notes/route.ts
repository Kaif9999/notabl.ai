import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();
  // Create note logic
  return NextResponse.json({ success: true });
}

export async function PUT(request: Request) {
  const data = await request.json();
  // Update note logic
  return NextResponse.json({ success: true });
}
