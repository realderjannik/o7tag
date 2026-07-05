"use client";

import { LegalPage } from "@/components/layout/LegalPage";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function TosPage() {
  const { t } = useLanguage();

  return (
    <LegalPage title={t.legal.tosTitle}>
      <p>1. Geltungsbereich — diese Bedingungen regeln die Nutzung von o7tag.</p>
      <p>2. Registrierung — die Nutzung erfolgt über Discord-OAuth-Login.</p>
      <p>
        3. Verbotene Inhalte — Profile, die gegen geltendes Recht verstoßen, zu
        Phishing/Scam genutzt werden oder Rechte Dritter verletzen, werden entfernt.
      </p>
      <p>4. Kündigung / Sperrung — o7tag behält sich vor, Accounts bei Missbrauch zu sperren.</p>
      <p>5. Abonnements — Premium-Abos werden über Stripe abgewickelt und können jederzeit gekündigt werden.</p>
    </LegalPage>
  );
}
