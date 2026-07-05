import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AnalyticsView } from "@/components/analytics/AnalyticsView";

export default async function AnalyticsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: page } = await supabase
    .from("pages")
    .select("view_count, is_premium")
    .eq("user_id", user.id)
    .single();

  if (!page) {
    redirect("/onboarding");
  }

  return <AnalyticsView viewCount={page.view_count} isPremium={page.is_premium} />;
}
