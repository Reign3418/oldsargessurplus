# Enterprise Legal, Accessibility & Security Compliance (`COMPLIANCE.md`)

**Platform:** Old Sarge's Surplus (`oldsargessurplus.com`)  
**Physical Storefront:** 240 S Bragg Blvd, Spring Lake, NC 28390 · `(910) 497-5335`  
**Verification Standard:** **Project Aegis™** (*Automated Security, WCAG 2.1 AA Accessibility, Load & SEO Verification Suite*)

---

## 1. Consumer Protection & Brand Entity Disambiguation

- **Zero Affiliation Disclosure:** Old Sarge's Surplus (`240 S Bragg Blvd, Spring Lake, NC 28390`) is an independent, family-owned North Carolina brick-and-mortar retail and uniform sewing establishment. It has **zero affiliation, shared ownership, or operational connection** with *"Old Sarge's Drop Zone"* (`oldsargesdropzone.com`, located at `7031 US-20, Westfield, NY 14787`).
- **Structured Schema Disambiguation:** The root DOM (`index.html`) and AI Search index (`public/llms.txt`) explicitly declare `disambiguatingDescription`, exact `PostalAddress`, and `GeoCoordinates` (`35.1636, -78.9728`) to prevent search engine and AI knowledge-graph conflation.

---

## 2. WCAG 2.1 AA & ADA Title III Accessibility Compliance

- **High-Contrast Typography & Color Ratios:** All three visual themes (`Hangar Gold & Steel`, `Fort Liberty Olive Drab`, and `Daylight Counter`) enforce high-contrast foreground/background pairings (`>= 4.5:1` for body text, `>= 7:1` for primary headings and price tags).
- **Keyboard & Screen-Reader Navigation:** All interactive modals (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`), search controls, and stock filters include semantic labels and full keyboard accessibility.
- **Reduced Motion Support:** Enforces `@media (prefers-reduced-motion: reduce)` across all transitions and animations in `src/index.css`.
- **Zero-JS / Crawler Fallback:** Provides a complete semantic `<header>`, `<h1>`, store address, telephone link, disambiguation notice, and inquiry form inside `<div id="root">` prior to client hydration.

---

## 3. Privacy, Zero-PII Leakage & Security Hardening

- **Zero Third-Party Trackers:** No unauthorized advertising pixels, behavioral trackers, or data-broker scripts are loaded.
- **Client-Local Pull-Sheet State:** Customer 24-Hour Counter Hold and CIF Calculator selections remain strictly in local browser memory until the customer voluntarily initiates a telephone call or SMS to `(910) 497-5335`.
- **Edge Security Headers (`public/_headers`):**
  - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
  - `X-Frame-Options: SAMEORIGIN`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=(self)`

---

## 4. USGI Surplus & Nomenclature Disclosure

- National Stock Numbers (`NSN`), U.S. Government Issue (`USGI`) designations, and AR 670-1 uniform specifications are provided strictly for identification, historical reference, and Fort Liberty CIF replacement comparison. Condition grades (`Unissued`, `Grade 1 Serviceable`, `Grade 2 Field`) are verified in person at the 240 S Bragg Blvd counter prior to purchase.
