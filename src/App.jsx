import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import PostEditorPage from "./pages/PostEditorPage";
import "./App.css";

// 诊断日志
console.log("App.jsx正在加载");
console.log("当前环境:", import.meta.env.MODE);
console.log("基础URL:", import.meta.env.BASE_URL);
console.log("当前URL:", window.location.href);

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/about" element={<AboutPage />} />
        
        {/* Admin Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/post/new" element={<PostEditorPage />} />
        <Route path="/admin/post/:id" element={<PostEditorPage />} />
        
        {/* 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
