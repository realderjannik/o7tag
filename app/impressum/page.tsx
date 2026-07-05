"use client";

import { LegalPage } from "@/components/layout/LegalPage";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function ImpressumPage() {
  const { t } = useLanguage();

  return (
    <LegalPage title={t.legal.impressumTitle}>
      <p>Angaben gemäß § 5 TMG / Section 5 TMG</p>
      <p>
        [Name]
        <br />
        [Straße, Hausnummer]
        <br />
        [PLZ, Ort]
        <br />
        [Land]
      </p>
      <p>
        Kontakt: [E-Mail-Adresse]
        <br />
        {"Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV: [Name]"}
      </p>
    </LegalPage>
  );
}
