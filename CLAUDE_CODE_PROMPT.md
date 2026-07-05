# Projekt: o7tag – Bio-Link SaaS (guns.lol-Style)

## Kontext
Ich baue **o7tag**, ein SaaS-Produkt für individuelle Bio-Link-Seiten (`o7tag.com/username`),
im Stil von guns.lol / bio.link – düsterer, customizable, gaming-nah, mit Audio- und
Discord-Integration. Es ist das Schwesterprojekt zu **o7overlay.com** (Streaming-Widget-
Plattform), daher soll das Branding daran anknüpfen: gleiches "o7"-Präfix, ähnlicher
lockerer aber rechtlich sauberer Aufbau (Impressum/ToS/Privacy von Anfang an), DE/EN-
Support, "Crafted by [Name]"-Footer-Branding statt anonymer Firmen-Optik.

Ich schreibe den Großteil des Codes selbst und nutze dich (Claude Code) für Feedback,
Debugging und punktuelle Implementierungshilfe, wenn ich explizit feststecke – nicht als
Auto-Pilot, der alles fertig baut. Erkläre mir Architekturentscheidungen kurz, bevor du
Code schreibst, und frag nach, wenn eine Anforderung unklar ist, statt zu raten.

## Tech-Stack
- **Framework:** Next.js 14+ (App Router, TypeScript)
- **Auth & DB & Storage:** Supabase (Postgres, Auth via Discord OAuth, Storage für Avatare/Audio)
- **Payments:** Stripe (Subscriptions, Customer Portal für Self-Service, kein manueller Support)
- **Discord-Status:** Lanyard API (öffentliche API, kein eigener Bot nötig)
- **Styling:** Tailwind CSS
- **Hosting:** Vercel

## Projektstruktur (bereits angelegt unter D:\o7tag\)
```
app/
  (auth)/login/          -> Discord-OAuth-Login-Seite
  (auth)/callback/       -> OAuth-Callback-Handler
  (dashboard)/dashboard/
    editor/              -> Bio-Page-Editor (Links, Theme, Audio, Avatar)
    analytics/           -> View-Counter, Klick-Statistiken pro Link
    settings/            -> Account, Subscription, Custom Domain (Premium)
  [username]/             -> öffentliche Profilseite (dynamische Route)
  api/
    auth/                -> Auth-Routen
    stripe/               -> Webhooks, Checkout-Session, Customer Portal
    pages/                -> CRUD für Bio-Pages
    upload/               -> Avatar-/Audio-Upload-Handler
components/
  editor/                 -> Editor-UI-Bausteine (Link-Liste, Theme-Picker, Audio-Uploader)
  profile/                -> Komponenten für die öffentliche Profilseite
  ui/                     -> generische UI-Primitives (Button, Input, Modal)
  layout/                 -> Nav, Footer, Shell
lib/
  supabase/               -> Client-/Server-Instanzen, Typen
  stripe/                 -> Stripe-Client, Preis-IDs
  discord-lanyard/        -> Lanyard-API-Wrapper (Presence-Fetch)
  utils/                  -> Helper (Slug-Validierung, Formatierung etc.)
hooks/                    -> React Hooks (useSession, usePageData, ...)
types/                    -> geteilte TypeScript-Typen
public/
  themes/                 -> Theme-Preview-Assets
  fonts/
supabase/
  migrations/             -> SQL-Migrationen (users, pages, links, themes)
styles/
docs/
```

## MVP-Featureset (Reihenfolge = Priorität)
1. Discord-OAuth-Login + Username-Claim (einmalig, unveränderlich oder mit Cooldown)
2. Datenmodell: `users` -> `pages` (1:1) -> `links[]`, `theme_id`, `audio_url`, `discord_id`
3. Editor: Links hinzufügen/sortieren/löschen, Avatar-Upload, Bio-Text, Hintergrund
   (Bild/Video/Farbe), ein Audio-Track mit Click-to-Unmute (kein echtes Autoplay-with-sound,
   Browser blocken das ohnehin)
4. 3-5 vordefinierte Themes (kein freies Custom-CSS im MVP)
5. Öffentliche Profilseite `/[username]` inkl. Discord-Presence-Badge via Lanyard
6. View-Counter pro Profil
7. Freemium-Gate: Free = Basics + o7tag-Branding sichtbar; Premium via Stripe = mehr
   Link-Slots, kein Branding, Custom Domain, Analytics

## Bewusst NICHT im MVP
- Custom Domain-Support
- Freies Custom CSS/JS pro Profil
- Team-/Multi-Page-Accounts
- Eigenes Analytics-Dashboard über simplen View-Counter hinaus

## Wichtige Nebenanforderungen
- Melde-/Report-Funktion für Profile von Anfang an einplanen (Datenmodell-seitig
  mindestens vorbereiten) – die Nische zieht Phishing-/Scam-Versuche an
- Impressum, ToS, Privacy Policy als eigene Routen von Tag 1 an (Struktur wie o7overlay.com)
- DE/EN-Sprachumschalter wie bei o7overlay.com

## Erster Auftrag an dich
Schau dir die vorhandene Ordnerstruktur unter D:\o7tag\ an, initialisiere darin ein
Next.js-Projekt (TypeScript, App Router, Tailwind) OHNE die bestehenden Ordner zu
überschreiben, und schlage mir das Supabase-Datenbankschema (SQL-Migration für
`users`, `pages`, `links`, `themes`) zur Prüfung vor, bevor du es anlegst. Erklär mir kurz
deine Annahmen zu Beziehungen/Constraints, bevor du die Migration schreibst.
