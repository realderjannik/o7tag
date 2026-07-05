"use client";

import { LegalPage } from "@/components/layout/LegalPage";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function PrivacyPage() {
  const { t } = useLanguage();

  return (
    <LegalPage title={t.legal.privacyTitle}>
      <p>1. Verantwortlicher — siehe Impressum.</p>
      <p>
        2. Erhobene Daten — Discord-ID, Discord-Username, Avatar, sowie die von dir
        selbst eingegebenen Profildaten (Bio, Links, Theme, Audio).
      </p>
      <p className="font-medium text-zinc-300">3. Cookies</p>
      <p>
        Wir setzen ausschließlich technisch notwendige Cookies unseres Auth-Anbieters
        Supabase (Namen beginnend mit <code className="text-zinc-400">sb-</code>) ein, um
        deine Anmeldung zu speichern und dich eingeloggt zu halten (Session- und
        Refresh-Token). Diese Cookies sind für den Betrieb des Logins zwingend
        erforderlich und bleiben bis zu 100 Tage gespeichert oder bis du dich abmeldest.
      </p>
      <p>
        Da es sich um funktional notwendige Cookies handelt (keine Tracking-, Marketing-
        oder Analyse-Cookies), ist nach § 25 Abs. 2 Nr. 2 TTDSG i.V.m. Art. 6 Abs. 1 lit.
        b/f DSGVO keine gesonderte Einwilligung erforderlich.
      </p>
      <p>4. Zweck der Verarbeitung — Bereitstellung und Betrieb deiner öffentlichen Bio-Page.</p>
      <p>5. Hosting — Vercel, Datenbank & Storage über Supabase.</p>
      <p>6. Zahlungsdaten — Zahlungsabwicklung über Stripe; o7tag speichert keine Kartendaten.</p>
      <p>7. Deine Rechte — Auskunft, Berichtigung, Löschung nach Art. 15–17 DSGVO.</p>
    </LegalPage>
  );
}
