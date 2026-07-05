import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SettingsView } from "@/components/settings/SettingsView";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [{ data: userRow }, { data: page }] = await Promise.all([
    supabase.from("users").select("uid, is_premium").eq("id", user.id).single(),
    supabase.from("pages").select("username").eq("user_id", user.id).single(),
  ]);

  if (!userRow || !page) {
    redirect("/onboarding");
  }

  return (
    <SettingsView username={page.username} uid={userRow.uid} isPremium={userRow.is_premium} />
  );
}
