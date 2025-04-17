import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// 装饰性的分隔符组件
const OrnamentalDivider = ({ symbol = "❖" }) => (
  <div className="ornamental-divider">
    <span className="px-2">{symbol}</span>
  </div>
);

const AdminLayout = ({ children, title }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-scroll-paper text-sepia">
      {/* 顶部导航栏 */}
      <header className="py-4 border-b border-sepia-light/30 bg-scroll-edges/50">
        <div className="container-wrapper">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link
                to="/admin/dashboard"
                className="text-xl font-serif tracking-wide text-sepia-dark flex items-center"
              >
                <span className="text-sepia-dark">Brou's Blog</span>
                <span className="ml-2 text-sm bg-sepia-lightest rounded-md px-2 py-1 text-sepia-dark border border-sepia-light/30">
                  Admin
                </span>
              </Link>
            </div>
            
            {/* 桌面版导航 */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/admin/dashboard"
                className="text-sm font-medium text-sepia-dark transition-colors duration-200 hover:underline"
              >
                Dashboard
              </Link>
              <Link
                to="/admin/post/new"
                className="text-sm font-medium text-sepia-dark transition-colors duration-200 hover:underline"
              >
                New Post
              </Link>
              <Link
                to="/"
                className="text-sm font-medium text-sepia-dark transition-colors duration-200 hover:underline"
                target="_blank"
              >
                View Blog
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm font-medium bg-sepia-light/20 hover:bg-sepia-light/40 text-sepia-dark px-3 py-1.5 rounded transition-colors duration-200"
              >
                Logout
              </button>
            </nav>
            
            {/* 移动版菜单按钮 */}
            <button 
              className="md:hidden text-sepia-dark"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                className="w-6 h-6"
              >
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
          {/* 移动版下拉菜单 */}
          {menuOpen && (
            <div className="md:hidden py-3 space-y-2 mt-3 border-t border-sepia-light/30">
              <Link
                to="/admin/dashboard"
                className="block text-sm py-2 font-medium text-sepia-dark hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/admin/post/new"
                className="block text-sm py-2 font-medium text-sepia-dark hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                New Post
              </Link>
              <Link
                to="/"
                className="block text-sm py-2 font-medium text-sepia-dark hover:underline"
                target="_blank"
                onClick={() => setMenuOpen(false)}
              >
                View Blog
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="block w-full text-left text-sm py-2 font-medium text-sepia-dark hover:underline"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* 页面标题区 */}
      <div className="bg-scroll-edges/30 border-b border-sepia-light/30">
        <div className="container-wrapper py-6">
          <h1 className="text-2xl font-serif font-light text-sepia-dark">
            {title || "Admin Panel"}
          </h1>
        </div>
      </div>

      <main className="flex-grow py-8 relative">
        <div className="scroll-top"></div>
        <div className="container-wrapper">
          {children}
        </div>
        <div className="scroll-bottom"></div>
      </main>

      <footer className="py-6 border-t border-sepia-light/30 text-xs text-sepia-muted text-center">
        <div className="container-wrapper">
          <p>© 2025 Brou's Blog Admin. <Link to="/" className="text-sepia-dark hover:underline">Return to site</Link></p>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout; 