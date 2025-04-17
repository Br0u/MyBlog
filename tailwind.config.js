/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // 启用class-based深色模式
  theme: {
    extend: {
      colors: {
        'sepia': {
          DEFAULT: '#6d4c41', // 添加基础棕色作为默认的sepia颜色
          'lightest': '#f9f6f0',
          'light': '#e8dfc7',
          'muted': '#7c7267',
          'dark': '#4b3621',
          'darkest': '#2a1a0f',
        },
        'scroll-paper': '#f5f1e6',
        'scroll-edges': '#e8dfc7',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme('colors.sepia.dark'),
            a: {
              color: theme('colors.sepia.dark'),
              textDecoration: 'none',
              borderBottom: `1px solid ${theme('colors.sepia.light')}`,
              '&:hover': {
                color: theme('colors.sepia.darkest'),
              },
            },
          },
        },
        // 深色模式排版定制
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.blue.400'),
              '&:hover': {
                color: theme('colors.blue.300'),
              },
            },
            h1: {
              color: theme('colors.gray.200'),
            },
            h2: {
              color: theme('colors.gray.200'),
            },
            h3: {
              color: theme('colors.gray.200'),
            },
            h4: {
              color: theme('colors.gray.200'),
            },
            strong: {
              color: theme('colors.gray.200'),
            },
            blockquote: {
              color: theme('colors.gray.300'),
              borderLeftColor: theme('colors.gray.600'),
            },
            code: {
              color: theme('colors.gray.200'),
            },
          },
        },
      }),
    },
  },
  // 确保在深色模式下正确启用排版样式
  plugins: [
    require('@tailwindcss/typography')({
      modifiers: ['dark'],
    }),
  ],
}; 