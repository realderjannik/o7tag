import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [{ data: userRow }, { data: page }] = await Promise.all([
    supabase.from("users").select("uid, is_premium").eq("id", user.id).single(),
    supabase
      .from("pages")
      .select("id, username, avatar_url, bio_text, view_count")
      .eq("user_id", user.id)
      .single(),
  ]);

  if (!userRow || !page) {
    redirect("/onboarding");
  }

  const { count: linkCount } = await supabase
    .from("links")
    .select("id", { count: "exact", head: true })
    .eq("page_id", page.id);

  return (
    <DashboardOverview
      username={page.username}
      avatarUrl={page.avatar_url ?? ""}
      bioText={page.bio_text ?? ""}
      uid={userRow.uid}
      isPremium={userRow.is_premium}
      viewCount={page.view_count}
      linkCount={linkCount ?? 0}
    />
  );
}
