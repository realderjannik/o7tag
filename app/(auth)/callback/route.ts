import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { origin, searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=missing_code`);
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.user) {
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(error?.message ?? "auth_failed")}`
    );
  }

  const { data: existingPage } = await supabase
    .from("pages")
    .select("username")
    .eq("user_id", data.user.id)
    .maybeSingle();

  // First-time users go straight to the editor to set up their page;
  // returning users land on the dashboard overview.
  return NextResponse.redirect(
    `${origin}${existingPage ? "/dashboard" : "/onboarding"}`
  );
}
