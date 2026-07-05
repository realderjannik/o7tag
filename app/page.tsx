"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { getMockPage } from "@/lib/mock-data";
import { getTheme } from "@/lib/themes";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { LinksList } from "@/components/profile/LinksList";

export default function Home() {
  const { t } = useLanguage();
  const demoPage = getMockPage("ghost")!;
  const demoTheme = getTheme(demoPage.themeId);

  const features = [
    { icon: "discord" as const, title: t.home.feature1Title, desc: t.home.feature1Desc },
    { icon: "flag" as const, title: t.home.feature2Title, desc: t.home.feature2Desc },
    { icon: "volumeOn" as const, title: t.home.feature3Title, desc: t.home.feature3Desc },
    { icon: "discord" as const, title: t.home.feature4Title, desc: t.home.feature4Desc },
    { icon: "eye" as const, title: t.home.feature5Title, desc: t.home.feature5Desc },
    { icon: "link" as const, title: t.home.feature6Title, desc: t.home.feature6Desc },
  ];

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />

      <main>
        <section className="relative overflow-hidden px-6 pb-24 pt-20">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px]"
            style={{
              background:
                "radial-gradient(circle at 50% 0%, rgba(245,158,11,0.18), transparent 60%)",
            }}
          />
          <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-bold leading-tight text-zinc-100 sm:text-5xl">
                {t.home.heroTitle}
              </h1>
              <p className="mt-5 max-w-md text-lg text-zinc-400">{t.home.heroSubtitle}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/login">
                  <Button size="lg">
                    <Icon name="discord" className="h-4 w-4" />
                    {t.home.ctaPrimary}
                  </Button>
                </Link>
                <Link href="/ghost">
                  <Button size="lg" variant="secondary">
                    {t.home.ctaSecondary}
                  </Button>
                </Link>
              </div>
            </div>

            <div className="mx-auto">
              <div
                className="relative flex h-[520px] w-[280px] flex-col items-center gap-6 overflow-hidden rounded-[2.5rem] border-4 border-zinc-800/80 p-6 shadow-2xl"
                style={{
                  background: `radial-gradient(circle at 50% -10%, ${demoTheme.accentSoft}, transparent 60%), linear-gradient(180deg, ${demoTheme.bgFrom}, ${demoTheme.bgTo})`,
                }}
              >
                <ProfileHeader page={demoPage} theme={demoTheme} />
                <LinksList links={demoPage.links} theme={demoTheme} />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-zinc-100">
              {t.home.featuresTitle}
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition-colors hover:border-brand-500 hover:shadow-[0_10px_30px_var(--color-brand-glow)]"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-brand-500/30 bg-brand-500/10 text-brand-500">
                    <Icon name={f.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="mb-1.5 font-semibold text-zinc-100">{f.title}</h3>
                  <p className="text-sm text-zinc-500">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="px-6 py-20">
          <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-7">
              <h3 className="font-semibold text-zinc-100">Free</h3>
              <p className="mt-1 text-3xl font-bold text-zinc-100">
                €0<span className="text-sm font-normal text-zinc-500">/mo</span>
              </p>
              <ul className="mt-5 flex flex-col gap-2 text-sm text-zinc-400">
                <li>✓ Up to 5 links</li>
                <li>✓ 4 predefined themes</li>
                <li>✓ Discord presence</li>
                <li className="text-zinc-600">— o7tag branding shown</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-brand-500/30 bg-brand-500/[0.04] p-7">
              <h3 className="font-semibold text-zinc-100">Premium</h3>
              <p className="mt-1 text-3xl font-bold text-zinc-100">
                €4.99<span className="text-sm font-normal text-zinc-500">/mo</span>
              </p>
              <ul className="mt-5 flex flex-col gap-2 text-sm text-zinc-300">
                <li>✓ Unlimited links</li>
                <li>✓ No o7tag branding</li>
                <li>✓ Custom domain</li>
                <li>✓ Full analytics</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
