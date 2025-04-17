/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "scroll-paper": "#F8F4E8", // 羊皮纸主色
        "scroll-edges": "#E6DFC8", // 卷轴边缘色
        sepia: {
          lightest: "#FAF6ED", // 最浅的羊皮纸色
          light: "#E8DFC7", // 浅羊皮纸色
          DEFAULT: "#4B3621", // 标准文本色
          muted: "#8D7B68", // 浅文本色
          dark: "#3D2B1F", // 深标题色
          darkest: "#2A1A0F", // 最深色
        },
      },
      fontFamily: {
        serif: [
          '"Noto Serif"',
          "Georgia",
          "Cambria",
          '"Times New Roman"',
          "serif",
        ],
        display: ['"Cinzel Decorative"', '"Noto Serif"', "Georgia", "serif"],
      },
      backgroundImage: {
        "paper-texture": "url('/src/assets/paper-texture.png')",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#4B3621",
            maxWidth: "100%",
            a: {
              color: "#3D2B1F",
              textDecoration: "none",
              fontWeight: "400",
              borderBottomWidth: "1px",
              borderColor: "#E8DFC7",
              "&:hover": {
                color: "#2A1A0F",
              },
            },
            h1: {
              fontWeight: "300",
              letterSpacing: "-0.025em",
              color: "#3D2B1F",
            },
            h2: {
              fontWeight: "400",
              letterSpacing: "-0.025em",
              color: "#3D2B1F",
            },
            h3: {
              fontWeight: "400",
              letterSpacing: "-0.025em",
              color: "#3D2B1F",
            },
            blockquote: {
              fontStyle: "italic",
              fontWeight: "400",
              borderLeftWidth: "2px",
              borderColor: "#E8DFC7",
              color: "#8D7B68",
              backgroundColor: "rgba(248, 244, 232, 0.5)",
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
            },
            code: {
              color: "#8B5A2B",
              backgroundColor: "rgba(139, 115, 85, 0.1)",
              padding: "0.1rem 0.3rem",
              borderRadius: "0.2rem",
              fontWeight: "400",
            },
            "pre code": {
              backgroundColor: "transparent",
              color: "#F5DEB3",
              padding: "0",
            },
            pre: {
              backgroundColor: "#2D2A24",
              color: "#F8F4E8",
              borderWidth: "1px",
              borderColor: "#8B7355",
              borderRadius: "0.125rem",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            hr: {
              borderColor: "rgba(139, 115, 85, 0.2)",
              marginTop: "2rem",
              marginBottom: "2rem",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
