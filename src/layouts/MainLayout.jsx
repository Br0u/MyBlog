import { Link } from "react-router-dom";

// 装饰性的分隔符组件
const OrnamentalDivider = ({ symbol = "❖" }) => (
  <div className="ornamental-divider">
    <span className="px-2">{symbol}</span>
  </div>
);

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-scroll-paper text-sepia">
      <header className="py-6 border-b border-sepia-light/30">
        <div className="container-wrapper">
          <nav className="flex items-center justify-between">
            <div>
              <Link
                to="/"
                className="text-2xl font-serif tracking-wide text-sepia-dark"
              >
                Brou's Blog
              </Link>
            </div>
            <div className="flex space-x-8">
              <Link
                to="/"
                className="text-sm font-medium text-sepia-muted hover:text-sepia-dark transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium text-sepia-muted hover:text-sepia-dark transition-colors duration-200"
              >
                About
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-grow py-12 relative">
        <div className="scroll-top"></div>
        {children}
        <div className="scroll-bottom"></div>
      </main>

      <footer className="py-10 border-t border-sepia-light/30 text-sm text-sepia-muted">
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
                className="hover:text-sepia-dark transition-colors duration-200"
              >
                Twitter
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sepia-dark transition-colors duration-200"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sepia-dark transition-colors duration-200"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
