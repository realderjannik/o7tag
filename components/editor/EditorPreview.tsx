import type { PageData } from "@/types";
import { getTheme } from "@/lib/themes";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { LinksList } from "@/components/profile/LinksList";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function EditorPreview({ page }: { page: PageData }) {
  const { t } = useLanguage();
  const theme = getTheme(page.themeId);

  return (
    <div className="sticky top-6">
      <p className="mb-3 text-sm font-medium text-zinc-300">{t.editor.preview}</p>
      <div
        className="relative mx-auto flex h-[600px] w-[300px] flex-col items-center gap-6 overflow-y-auto rounded-[2rem] border-4 border-zinc-800 p-6 shadow-2xl"
        style={{
          background: `radial-gradient(circle at 50% -10%, ${theme.accentSoft}, transparent 60%), linear-gradient(180deg, ${theme.bgFrom}, ${theme.bgTo})`,
        }}
      >
        <ProfileHeader page={page} theme={theme} />
        <LinksList links={page.links} theme={theme} />
      </div>
    </div>
  );
}
