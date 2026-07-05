import Link from "next/link";
import { getMockPage } from "@/lib/mock-data";
import { getTheme } from "@/lib/themes";
import { ProfileBackground } from "@/components/profile/ProfileBackground";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { LinksList } from "@/components/profile/LinksList";
import { AudioPlayer } from "@/components/profile/AudioPlayer";
import { ReportButton } from "@/components/profile/ReportButton";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const page = getMockPage(username);

  if (!page) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-zinc-950 px-6 text-center">
        <p className="text-6xl">👻</p>
        <h1 className="text-xl font-semibold text-zinc-100">
          This page doesn&apos;t exist
        </h1>
        <p className="max-w-xs text-sm text-zinc-500">
          @{username} hasn&apos;t been claimed yet.
        </p>
        <Link
          href="/login"
          className="mt-2 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 px-4 py-2 text-sm font-medium text-white shadow-[0_0_20px_var(--color-brand-glow)] hover:-translate-y-0.5"
        >
          Claim it now
        </Link>
      </main>
    );
  }

  const theme = getTheme(page.themeId);

  return (
    <main className="relative flex min-h-screen flex-col items-center px-6 py-16">
      <ProfileBackground page={page} theme={theme} />

      <div className="flex w-full max-w-sm flex-col items-center gap-8">
        <ProfileHeader page={page} theme={theme} />
        <LinksList links={page.links} theme={theme} />

        {!page.isPremium && (
          <Link
            href="/"
            className="mt-2 text-xs text-zinc-600 transition-colors hover:text-zinc-400"
          >
            made with o7tag
          </Link>
        )}
      </div>

      {page.audioUrl && <AudioPlayer src={page.audioUrl} theme={theme} />}
      <ReportButton username={page.username} />
    </main>
  );
}
