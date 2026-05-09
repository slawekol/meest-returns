import type { Config } from 'tailwindcss';

/**
 * Shared Tailwind preset for all Meest&Returns apps. Tokens mirror the Stitch
 * design system (stitch-exports/consumer/meest_returns_design_system/DESIGN.md)
 * so HTML imported from Stitch keeps its class names verbatim.
 */
const preset: Omit<Config, 'content'> = {
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // Brand palette (design.md)
        'text-primary': '#0F172A',
        'text-secondary': '#64748B',
        'text-muted': '#94A3B8',
        'border-base': '#E2E8F0',
        'bg-light': '#FAFAFA',
        'bg-subtle': '#F1F5F9',

        // Surface system
        surface: '#fcf8fa',
        'surface-dim': '#dcd9db',
        'surface-bright': '#fcf8fa',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f6f3f5',
        'surface-container': '#f0edef',
        'surface-container-high': '#eae7e9',
        'surface-container-highest': '#e4e2e4',
        'surface-variant': '#e4e2e4',
        'surface-tint': '#565e74',
        'on-surface': '#1b1b1d',
        'on-surface-variant': '#45464d',
        'inverse-surface': '#303032',
        'inverse-on-surface': '#f3f0f2',

        // Material-style brand slots used by Stitch markup
        primary: '#000000',
        'on-primary': '#ffffff',
        'primary-container': '#131b2e',
        'on-primary-container': '#7c839b',
        'primary-fixed': '#dae2fd',
        'primary-fixed-dim': '#bec6e0',
        'on-primary-fixed': '#131b2e',
        'on-primary-fixed-variant': '#3f465c',
        'inverse-primary': '#bec6e0',

        secondary: '#006c49',
        'on-secondary': '#ffffff',
        'secondary-container': '#6cf8bb',
        'on-secondary-container': '#00714d',
        'secondary-fixed': '#6ffbbe',
        'secondary-fixed-dim': '#4edea3',
        'on-secondary-fixed': '#002113',
        'on-secondary-fixed-variant': '#005236',

        tertiary: '#000000',
        'on-tertiary': '#ffffff',
        'tertiary-container': '#271901',
        'on-tertiary-container': '#98805d',
        'tertiary-fixed': '#fcdeb5',
        'tertiary-fixed-dim': '#dec29a',
        'on-tertiary-fixed': '#271901',
        'on-tertiary-fixed-variant': '#574425',

        // Semantic
        success: '#10B981',
        warning: '#F59E0B',
        info: '#3B82F6',
        error: '#EF4444',
        'on-error': '#ffffff',
        'error-container': '#ffdad6',
        'on-error-container': '#93000a',

        outline: '#76777d',
        'outline-variant': '#c6c6cd',
        background: '#fcf8fa',
        'on-background': '#1b1b1d',

        // Status pills (design.md)
        'badge-initiated-bg': '#F1F5F9',
        'badge-dropped-bg': '#FEF3C7',
        'badge-transit-bg': '#DBEAFE',
        'badge-received-bg': '#EDE9FE',
        'badge-completed-bg': '#D1FAE5',
        'badge-rejected-bg': '#FEE2E2',

        // shadcn semantic vars (kept so packages/ui components work unchanged)
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        foreground: 'hsl(var(--foreground))',
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      spacing: {
        unit: '4px',
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        xxl: '48px',
        xxxl: '64px',
        'container-padding': '24px',
        'section-gap': '48px',
        'form-gap': '16px',
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        sm: '0.25rem',
        md: '0.75rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', '"JetBrains Mono"', 'ui-monospace', 'monospace'],
        display: ['var(--font-sans)', 'Inter', 'sans-serif'],
        h1: ['var(--font-sans)', 'Inter', 'sans-serif'],
        h2: ['var(--font-sans)', 'Inter', 'sans-serif'],
        body: ['var(--font-sans)', 'Inter', 'sans-serif'],
        small: ['var(--font-sans)', 'Inter', 'sans-serif'],
        'label-caps': ['var(--font-sans)', 'Inter', 'sans-serif'],
        technical: ['var(--font-mono)', '"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        display: [
          '32px',
          { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' },
        ],
        h1: ['24px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        h2: ['20px', { lineHeight: '1.3', fontWeight: '600' }],
        body: ['15px', { lineHeight: '1.6', fontWeight: '400' }],
        small: ['13px', { lineHeight: '1.4', fontWeight: '500' }],
        'label-caps': [
          '11px',
          { lineHeight: '1', letterSpacing: '0.5px', fontWeight: '600' },
        ],
        technical: ['14px', { lineHeight: '1.5', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
};

export default preset;
