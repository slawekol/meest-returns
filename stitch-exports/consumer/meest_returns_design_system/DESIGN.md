---
name: Meest&Returns Design System
colors:
  surface: '#fcf8fa'
  surface-dim: '#dcd9db'
  surface-bright: '#fcf8fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f5'
  surface-container: '#f0edef'
  surface-container-high: '#eae7e9'
  surface-container-highest: '#e4e2e4'
  on-surface: '#1b1b1d'
  on-surface-variant: '#45464d'
  inverse-surface: '#303032'
  inverse-on-surface: '#f3f0f2'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#271901'
  on-tertiary-container: '#98805d'
  error: '#EF4444'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#fcdeb5'
  tertiary-fixed-dim: '#dec29a'
  on-tertiary-fixed: '#271901'
  on-tertiary-fixed-variant: '#574425'
  background: '#fcf8fa'
  on-background: '#1b1b1d'
  surface-variant: '#e4e2e4'
  bg-light: '#FAFAFA'
  bg-subtle: '#F1F5F9'
  border-base: '#E2E8F0'
  text-primary: '#0F172A'
  text-secondary: '#64748B'
  text-muted: '#94A3B8'
  success: '#10B981'
  warning: '#F59E0B'
  info: '#3B82F6'
  badge-initiated-bg: '#F1F5F9'
  badge-dropped-bg: '#FEF3C7'
  badge-transit-bg: '#DBEAFE'
  badge-received-bg: '#EDE9FE'
  badge-completed-bg: '#D1FAE5'
  badge-rejected-bg: '#FEE2E2'
typography:
  display:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h1:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  h2:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.3'
  body:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: '1.6'
  small:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '1.4'
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.5px
  technical:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  xxxl: 64px
  container-padding: 24px
  section-gap: 48px
  form-gap: 16px
---

# Meest&Returns — Design System

## Brand DNA

Meest&Returns is a return logistics platform for e-commerce.
The product feeling we want: confident, professional, fast, trustworthy.
NOT: playful, cute, gamified, kid-friendly.

Reference brands for visual feel:
- Stripe (clarity, professional restraint)
- Linear (density, dark UI option, sharp typography)
- Vercel (whitespace, monochrome with single accent)

What we are NOT: InPost (yellow + chaotic), DPD (red + corporate boring), 
Shopify (too friendly/colorful for B2B logistics).

## Color Palette

Primary brand color: #0F172A (deep navy slate, almost black)
Accent (CTA, success, active states): #10B981 (emerald green)
Background light: #FAFAFA (off-white, warmer than pure white)
Background subtle: #F1F5F9 (light slate)
Border: #E2E8F0
Text primary: #0F172A
Text secondary: #64748B
Text muted: #94A3B8

Semantic:
- Success: #10B981 (emerald)
- Warning: #F59E0B (amber)
- Error: #EF4444 (red)
- Info: #3B82F6 (blue)

Use color sparingly. 90% of UI is grayscale. 
Accent green ONLY for primary CTAs and success states.

## Typography

Font family: Inter (system fallback: -apple-system, BlinkMacSystemFont)
Font for numbers/codes: JetBrains Mono (for QR codes, IDs, container codes)

Scale:
- Display: 32px / 700 weight / tight tracking
- H1: 24px / 600 / tight
- H2: 20px / 600
- Body: 15px / 400 / 1.6 line-height
- Small: 13px / 500
- Tiny/labels: 11px / 600 / uppercase / 0.5px tracking

## Spacing

Base unit: 4px
Use multiples: 4, 8, 12, 16, 24, 32, 48, 64
Card padding: 24px
Section spacing: 48px
Form field gap: 16px

## Components

Buttons:
- Primary: solid #0F172A bg, white text, 12px padding-y / 24px padding-x, 8px radius
- Secondary: white bg, 1px border #E2E8F0, dark text
- CTA accent: solid #10B981 bg, white text (use only on key conversion actions)
- Height: 44px (mobile-friendly tap target)

Cards:
- White background
- 1px border #E2E8F0
- 12px border-radius
- Subtle shadow only on hover: 0 4px 12px rgba(0,0,0,0.05)

Inputs:
- 44px height
- 8px radius
- 1px border #E2E8F0, focus → 2px #10B981
- 15px font
- 12px horizontal padding

Status badges (pill shape, 4px/12px padding, 11px text):
- initiated: gray bg #F1F5F9, dark text
- dropped_off: amber bg #FEF3C7, brown text
- in_transit: blue bg #DBEAFE, blue text
- received: purple bg #EDE9FE, purple text
- completed: green bg #D1FAE5, green text
- rejected: red bg #FEE2E2, red text

## Layout

Consumer app: mobile-first, max-width 480px, centered on desktop
PUDO operator app: tablet-first 768px, single column, large tap targets
Merchant dashboard: desktop-first 1280px+, sidebar nav + main content

## Tone of Voice

Polish language primary.
Short sentences. No marketing fluff. No emojis in UI.
Examples:
GOOD: "Zwrot przyjęty. Środki w 24h."
BAD: "Świetnie! 🎉 Twój zwrot został przyjęty pomyślnie!"

Address user formal but warm: "Twój zwrot" not "Pana/Pani zwrot".

## Iconography

Use Lucide icons (open source, clean, geometric).
Stroke width: 1.5px
Size: 20px in body, 16px in buttons, 24px in nav
Color: inherit text color

NO illustrations except in empty states.
NO 3D renders, NO gradients, NO glassmorphism.

## Motion

Subtle. 150ms ease-out for hover/focus. 250ms for screen transitions.
NO bouncy animations, NO confetti, NO complex motion.

## What we explicitly avoid

- Stock photos of smiling people
- Generic "delivery guy" illustrations  
- Gradients except very subtle (e.g. #FAFAFA → #F1F5F9)
- Rounded corners larger than 16px
- Drop shadows on every element
- Multiple accent colors competing for attention