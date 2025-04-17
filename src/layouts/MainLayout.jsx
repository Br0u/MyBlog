import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ThemeToggle from "../components/ui/ThemeToggle";
import { FiChevronUp } from "react-icons/fi";

// 装饰性的分隔符组件
const OrnamentalDivider = ({ symbol = "❖" }) => (
  <div className="ornamental-divider">
    <span className="px-2">{symbol}</span>
  </div>
);

// 回到顶部按钮组件
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 监听滚动事件
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // 滚动到顶部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 p-3 rounded-full bg-sepia-dark dark:bg-gray-700 text-white shadow-lg transition-all duration-300 z-50 hover:bg-sepia-darkest dark:hover:bg-gray-600 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
      <FiChevronUp className="w-5 h-5" />
    </button>
  );
};

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-scroll-paper dark:bg-gray-900 text-sepia dark:text-gray-300 transition-colors duration-300">
      <header className="py-6 border-b border-sepia-light/30 dark:border-gray-700/70">
        <div className="container-wrapper">
          <nav className="flex items-center justify-between">
            <div>
              <Link
                to="/"
                className="text-2xl font-serif tracking-wide text-sepia-dark dark:text-gray-200"
              >
                Brou's Blog
              </Link>
            </div>
            <div className="flex items-center space-x-8">
              <Link
                to="/"
                className="text-sm font-medium text-sepia-muted dark:text-gray-400 hover:text-sepia-dark dark:hover:text-gray-200 transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium text-sepia-muted dark:text-gray-400 hover:text-sepia-dark dark:hover:text-gray-200 transition-colors duration-200"
              >
                About
              </Link>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-grow py-12 relative dark:bg-gray-900">
        <div className="scroll-top dark:bg-gray-800/50 dark:bg-gradient-to-b dark:from-gray-800 dark:to-transparent"></div>
        {children}
        <div className="scroll-bottom dark:bg-gray-800/50 dark:bg-gradient-to-t dark:from-gray-800 dark:to-transparent"></div>
      </main>

      <footer className="py-10 border-t border-sepia-light/30 dark:border-gray-700/70 text-sm text-sepia-muted dark:text-gray-400">
        <div className="container-wrapper">
          <OrnamentalDivider symbol="※" />
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>© 2025 Brou's Blog. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sepia-dark dark:hover:text-gray-200 transition-colors duration-200"
              >
                Twitter
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sepia-dark dark:hover:text-gray-200 transition-colors duration-200"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sepia-dark dark:hover:text-gray-200 transition-colors duration-200"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* 回到顶部按钮 */}
      <ScrollToTopButton />
    </div>
  );
};

export default MainLayout;
