/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#08090c',
          subtle: '#0d0f15',
          card: '#11131c',
          cardHover: '#161925',
          border: 'rgba(255, 255, 255, 0.07)',
          borderHover: 'rgba(255, 255, 255, 0.16)',
        },
        foreground: {
          DEFAULT: '#f3f4f6',
          muted: '#94a3b8',
          subtle: '#64748b',
          faint: '#334155',
        },
        accent: {
          DEFAULT: '#38bdf8', // crisp refined electric blue / sky
          glow: 'rgba(56, 189, 248, 0.12)',
          violet: '#818cf8', // soft violet accent
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
