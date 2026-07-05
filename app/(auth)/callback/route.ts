import { NextResponse } from "next/server";

// Stub OAuth callback route — will exchange the Supabase auth code for a
// session once the Supabase project and Discord provider are configured.
export async function GET(request: Request) {
  const { origin } = new URL(request.url);
  return NextResponse.redirect(`${origin}/dashboard/editor`);
}
