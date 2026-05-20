---
name: Visionary Bilingual
colors:
  surface: '#f9f9f6'
  surface-dim: '#dadad7'
  surface-bright: '#f9f9f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f4f1'
  surface-container: '#eeeeeb'
  surface-container-high: '#e8e8e5'
  surface-container-highest: '#e2e3e0'
  on-surface: '#1a1c1b'
  on-surface-variant: '#3f4944'
  inverse-surface: '#2f312f'
  inverse-on-surface: '#f1f1ee'
  outline: '#6f7974'
  outline-variant: '#bfc9c2'
  surface-tint: '#216a52'
  primary: '#003d2b'
  on-primary: '#ffffff'
  primary-container: '#00563f'
  on-primary-container: '#83c9ac'
  inverse-primary: '#8ed5b7'
  secondary: '#006c46'
  on-secondary: '#ffffff'
  secondary-container: '#7bfabb'
  on-secondary-container: '#00734b'
  tertiary: '#443200'
  on-tertiary: '#ffffff'
  tertiary-container: '#5f4807'
  on-tertiary-container: '#d9b86e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#aaf1d2'
  primary-fixed-dim: '#8ed5b7'
  on-primary-fixed: '#002116'
  on-primary-fixed-variant: '#00513b'
  secondary-fixed: '#7bfabb'
  secondary-fixed-dim: '#5ddda1'
  on-secondary-fixed: '#002112'
  on-secondary-fixed-variant: '#005234'
  tertiary-fixed: '#ffdf9b'
  tertiary-fixed-dim: '#e4c278'
  on-tertiary-fixed: '#251a00'
  on-tertiary-fixed-variant: '#5a4302'
  background: '#f9f9f6'
  on-background: '#1a1c1b'
  surface-variant: '#e2e3e0'
  surface-elevated: '#F4F4F0'
  text-primary: '#0A0A0A'
  text-secondary: '#6B6B6B'
  border-subtle: '#E5E5E0'
  warning-orange: '#D97757'
  error-red: '#C13C3C'
typography:
  display-hero:
    fontFamily: IBM Plex Sans Arabic
    fontSize: 56px
    fontWeight: '700'
    lineHeight: '1.1'
  display-hero-mobile:
    fontFamily: IBM Plex Sans Arabic
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
  h1:
    fontFamily: IBM Plex Sans Arabic
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
  h2:
    fontFamily: IBM Plex Sans Arabic
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  caption:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

The brand identity for this design system is **Modern, Bold, and Premium**, heavily inspired by the Saudi Vision 2030 aesthetic—specifically the intersection of NEOM’s futuristic minimalism, Linear’s technical precision, and Stripe’s sophisticated fluidity.

The personality is **confident and aspirational**, designed to make Saudi graduates feel like elite professionals rather than students. It balances national pride with global tech standards.

**Visual Style: Modern Corporate-Futurism**
- **Minimalism:** Use expansive whitespace and high-quality typography to create a "consultancy" feel.
- **Strategic High-Contrast:** Deep Saudi greens contrasted against warm, off-white surfaces to avoid the "coldness" of pure white SaaS apps.
- **Bilingual Hierarchy:** A rigorous dual-language framework where Arabic is the primary anchor (larger, bolder) and English provides a secondary, supportive layer.

## Colors

The palette is rooted in a "Deep Saudi Green" that signifies stability and institutional trust, paired with a "Vibrant Emerald" to represent the energy of the Kingdom's digital transformation.

- **Primary (#00563F):** Reserved for core brand elements and primary calls to action.
- **Secondary (#00A36C):** Used for "Live" states, success indicators, and interactive highlights (e.g., the AI Orb).
- **Tertiary/Gold (#C9A961):** Used exclusively for high-achievement markers, "Strong Fit" badges, and premium AI-enhanced insights.
- **Neutral (#FAFAF7):** A warm, parchment-tinted background that reduces eye strain and feels more premium than standard hex white.

## Typography

The typography system is a bilingual powerhouse designed for maximum legibility in both scripts. 

**Bidi Rules:**
1. **Arabic First:** All headings and primary body text use **IBM Plex Sans Arabic**. Arabic is always 15-20% larger than the English translation to account for the visual density of the script.
2. **The English Shadow:** **Inter** is used for all English translations. It should be set in a smaller size and a lighter color (Text Secondary) directly beneath the Arabic.
3. **Alignment:** Use `dir="rtl"` for the primary layout. English text within its own block should remain `ltr` but can be right-aligned if it is a short caption beneath Arabic.

## Layout & Spacing

This design system uses a **Fluid Grid** with fixed maximum containers for readability.

- **Grid Model:** 12-column grid for desktop with 24px gutters.
- **Bilingual Stacking:** When stacking Arabic and English, use a tight vertical rhythm (4px to 8px) to ensure the eye perceives them as a single semantic unit.
- **The "Stage" Layout:** For the Interview Room, use a centered "Stage" model where the AI Orb occupies the top 60% of the viewport, with a floating "Dock" for controls at the bottom.
- **Breakpoints:**
  - **Desktop:** 1280px+ (Side-by-side components).
  - **Tablet:** 768px - 1279px (Two-column layouts collapse; margins reduce to 24px).
  - **Mobile:** <767px (Full-width stacking; 16px horizontal margins).

## Elevation & Depth

Visual hierarchy is achieved through **Tonal Layers** and **Subtle Ambient Shadows**. 

- **Surface Layer:** Background uses the neutral base. Cards use the pure white Surface color.
- **Elevated Layer:** Use the `surface-elevated` color (#F4F4F0) for nested sections like transcript boxes or "Model Answer" containers to create depth without adding shadows.
- **Shadows:** Only used on primary cards and floating docks. Shadows must be extremely soft: `0 4px 16px rgba(0,0,0,0.04)`.
- **The Orb Depth:** The AI avatar uses a **vibrant glow/blur** effect (Backdrop Blur + Emerald Radial Gradient) to feel like a light source within the UI, rather than a flat asset.

## Shapes

The shape language is sophisticated and approachable, avoiding aggressive sharp corners in favor of generous, smooth radii.

- **Cards:** 16px radius for all main containers and dashboard cards.
- **Buttons:** 12px radius for a modern "app" feel.
- **Pills/Badges:** Fully rounded (999px) for status indicators and language toggles.
- **Iconography:** Use 1.5px stroke weights with rounded caps and joins to match the UI radius.

## Components

**Buttons**
- **Primary:** Filled #00563F with white text. 12px radius. 
- **Secondary (Accent):** Filled #00A36C for "Active" states like the recording microphone.
- **Ghost/Outline:** 1.5px border in #E5E5E0 for secondary actions (Skip, Repeat).

**Cards & Selection**
- Selectable cards (e.g., Company Pick) should use a 1px border. On selection, the border increases to 2px Primary Green with a checkmark icon in the top-right corner.

**The "AI Orb"**
- An abstract, faceless glowing sphere. It must pulse rhythmically when the AI speaks. In "Listening" mode, it settles into a slow, dim shimmer.

**Bilingual Input Fields**
- Inputs must be RTL-aware. Placeholders should show both languages (e.g., "فهد / Fahad"). The cursor should default to the right side.

**Radar Chart (Competency)**
- A pentagon shape with a 58% opacity emerald fill (#00A36C) and a solid 2px emerald stroke. Labels should be bilingual (Arabic primary, English secondary).