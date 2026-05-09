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