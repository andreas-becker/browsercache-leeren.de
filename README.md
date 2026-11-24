# browsercache-leeren.de

Anleitungen, um den Browsercache zu leeren – für Chrome, Edge, Firefox, Safari, Opera, Brave, Vivaldi, Samsung Internet und Internet Explorer (6–11), jeweils abhängig von Browserversion und Betriebssystem.

Die Seite ist komplett statisch: HTML, CSS und ein wenig ES5-JavaScript, kein Build-Schritt auf dem Server, keine Abhängigkeiten. Es gibt eine deutsche (`/`) und eine englische Version (`/en/`).

## Änderungen (November 2026)

### Inhalt und Browser
- Aktualisierte Anleitungen für aktuelle Browserversionen, weiterhin versionsabhängig.
- Neu: Brave, Vivaldi und Samsung Internet. Entfernt: der „Webkit“-Block und die doppelte Opera-Box.
- Internet Explorer 6–11 bleibt dokumentiert.
- Automatische Browser-Erkennung als Progressive Enhancement: Der erkannte Browser wird hervorgehoben („Ihr Browser“), die passende Version geöffnet und nach oben sortiert, das passende Betriebssystem markiert („Ihr Gerät“). Alle Browser bleiben sichtbar. Direktlinks per Anker, z. B. `#chrome`, `#firefox`. Der Fallback „Unbekannt“ funktioniert jetzt.
- Entfernt: Affiliate-Links und Feedback-Formular.
- URLs, SEO-Texte, Lizenz (CC BY-NC 3.0 DE), Haftungsausschluss und Footer sind unverändert.

### Mehrsprachigkeit (Deutsch und Englisch)
- Deutsch liegt wie bisher unter `/`, die englische Version unter `/en/` (`en/index.html`). Beide haben eigene URLs, Titel, Beschreibungen, Open-Graph-Tags und strukturierte Daten.
- Die englischen Anleitungen sind keine reine Übersetzung: Menünamen und Tastenbeschriftungen folgen den englischen Browser-Oberflächen (z. B. „Delete browsing data“, Ctrl + Shift + Del, Mac: Cmd + Shift + Delete).
- `hreflang`-Links (`de`, `en`, `x-default`) auf beiden Startseiten und in der `sitemap.xml`. Im Header gibt es einen Sprachwechsel-Link („English“ / „Deutsch“). Es gibt bewusst keine automatische Weiterleitung nach Browsersprache.
- Die Browser-Erkennung (`js/main.js`) wählt ihre Texte nach `<html lang>`.
- Impressum und Datenschutzerklärung gibt es nur auf Deutsch. Die englische Seite verlinkt darauf (mit `hreflang="de"`).
- Vorschaubilder: `images/og-image.jpg` (Deutsch) und `images/og-image-en.jpg` (Englisch).

### Design
- Neues, mobile-first Kartendesign auf Basis von „Andreas UI“ (Primärfarbe `#3382C0`, selbst gehostete Fira Sans, helles und dunkles Farbschema über `prefers-color-scheme`).
- Eigenes monochromes SVG-Iconset (Buchstaben-Monogramme) als Inline-Sprite, keine Hersteller-Logos.
- Alte Abhängigkeiten entfernt: jQuery, Modernizr, normalize.css, Open Sans, alte Icons.

### Kompatibilität
- Moderne Browser: `<details>/<summary>`-Akkordeons, CSS Grid via `@supports`.
- Internet Explorer 9–11: funktioniert, mit Fallbacks (alle Anleitungen aufgeklappt, einfaches Layout, keine CSS-Variablen).
- Internet Explorer 6–8: reines, lesbares HTML ohne Layout-Anspruch.
- JavaScript ist ES5 mit Feature-Guard, ohne Frameworks.

### Barrierefreiheit (WCAG 2.2, Stufe AA)
- Kontraste mindestens 4,5:1, sichtbarer Fokus, „Zum Inhalt springen“-Link, saubere Überschriftenhierarchie (je Seite ein `h1`).
- Reflow bis 320 px, Schriftgrößen in `rem`, Textabstände überschreibbar.
- Echter Text statt per CSS erzeugter Inhalte, Hinweis „(öffnet in neuem Tab)“ bei externen Links.
- Geprüft mit axe-core (Hell/Dunkel, 1280 px und 320 px): keine Verstöße auf allen drei Seiten.

### Social Media und SEO
- Open-Graph- und Twitter-Card-Tags (`summary_large_image`) für schöne Vorschauen in LinkedIn, Facebook, WhatsApp usw.; Vorschaubild `images/og-image.jpg` (1200×630).
- Canonical-Link je Sprache (`https://browsercache-leeren.de/` und `https://browsercache-leeren.de/en/`) und strukturierte Daten (JSON-LD, `HowTo`) auf beiden Startseiten.
- `sitemap.xml` (mit Sprachalternativen) und `robots.txt` (verweist auf die Sitemap).
- Die Seiten Impressum und Datenschutz haben keine Social-Tags.

### Favicons und App-Icons
Motiv: weißer Mülleimer auf blauem Verlauf (Andreas-UI-Blau). Das Icon wird mit `rsvg-convert` aus `favicon.svg` erzeugt.

| Datei | Verwendung |
| --- | --- |
| `favicon.ico` (16/32/48 px) | Standard-Fallback, auch für IE und alte Browser (wird von dort automatisch unter `/favicon.ico` abgerufen) |
| `favicon.svg` | Moderne Browser (skalierbar, scharf auf jedem Display) |
| `images/icons/favicon-16x16.png`, `favicon-32x32.png` | Browser-Tabs und Lesezeichen |
| `images/icons/apple-touch-icon.png` (180×180) | iOS/iPadOS „Zum Home-Bildschirm“, Safari |
| `images/icons/icon-192.png`, `icon-512.png` | Android/Chrome, über `site.webmanifest` |
| `images/icons/icon-maskable-192.png`, `icon-maskable-512.png` | Android adaptive Icons (Motiv im Safe-Zone-Bereich) |
| `images/icons/mstile-150x150.png` + `browserconfig.xml` | Windows-Kachel (IE 11 / Edge Legacy) |
| `site.webmanifest` | Web-App-Manifest mit Name, Farben und Icons |

Eingebunden sind sie im `<head>` aller Seiten (`index.html`, `en/index.html`, `impressum.html`, `datenschutz.html`) zusammen mit `theme-color` (`#3382C0`).

### Datenschutz und Server
- Matomo bleibt im Einsatz. Die Opt-out-Einbindung nutzt jetzt Fira Sans. Aus der Datenschutzerklärung wurden Kontaktformular- und CRM-Hinweise entfernt, da es beides nicht mehr gibt. Ansonsten kein inhaltlicher Eingriff in die rechtlichen Texte.
- `.htaccess`:
  - `Strict-Transport-Security` korrigiert (`max-age=63072000`, ohne `includeSubDomains; preload`). Der Header wirkt jetzt wirklich, die Seite muss daher per HTTPS erreichbar sein.
  - Doppelten `X-Content-Type-Options`-Header entfernt.
  - `Referrer-Policy: strict-origin-when-cross-origin` ergänzt.
  - MIME-Typen für `.webmanifest` und `.svg` ergänzt.

## Projektstruktur

```
.
├── index.html            Startseite mit allen Anleitungen
├── impressum.html
├── datenschutz.html
├── favicon.ico
├── favicon.svg
├── site.webmanifest
├── browserconfig.xml
├── sitemap.xml
├── robots.txt
├── .htaccess
├── en/
│   └── index.html        Englische Version
├── css/main.css
├── js/main.js            Browser-Erkennung (ES5, de + en)
├── fonts/                Fira Sans (300/400/600, woff2 + woff)
└── images/
    ├── og-image.jpg      Social-Media-Vorschaubild (Deutsch)
    ├── og-image-en.jpg   Social-Media-Vorschaubild (Englisch)
    └── icons/            PNG-Icons für Geräte und Plattformen
```

## Lokal ansehen
Die Seite braucht keinen Build-Schritt. Einfach `index.html` im Browser öffnen oder einen beliebigen statischen Server starten, z. B.:

```
python3 -m http.server 8000
```

Die Matomo-Einbindung ist protokoll-relativ und lädt unter `file://` nicht. Das betrifft nur lokale Tests.

## Deployment
Den Inhalt dieses Ordners auf den Webserver kopieren (Apache mit `mod_headers`, `mod_mime`). Danach:
- Prüfen, dass `https://browsercache-leeren.de/en/` erreichbar ist, und die `sitemap.xml` bei Google Search Console und Bing Webmaster Tools einreichen.
- Vorschau-Caches aktualisieren: [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) und [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/).
- Favicons werden von Browsern stark gecacht. Nach einem Wechsel hilft ein Hard-Reload oder ein privates Fenster zum Prüfen.

## Lizenz
Alle Inhalte stehen unter der [CC BY-NC 3.0 DE](https://creativecommons.org/licenses/by-nc/3.0/de/) Lizenz.
