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
      <p>3. Zweck der Verarbeitung — Bereitstellung und Betrieb deiner öffentlichen Bio-Page.</p>
      <p>4. Hosting — Vercel, Datenbank & Storage über Supabase.</p>
      <p>5. Zahlungsdaten — Zahlungsabwicklung über Stripe; o7tag speichert keine Kartendaten.</p>
      <p>6. Deine Rechte — Auskunft, Berichtigung, Löschung nach Art. 15–17 DSGVO.</p>
    </LegalPage>
  );
}
