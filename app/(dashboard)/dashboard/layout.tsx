import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: page } = await supabase
    .from("pages")
    .select("username")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!page) {
    redirect("/onboarding");
  }

  return (
    <div className="flex min-h-screen bg-zinc-950">
      <DashboardSidebar username={page.username} />
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl px-8 py-10">{children}</div>
      </div>
    </div>
  );
}
