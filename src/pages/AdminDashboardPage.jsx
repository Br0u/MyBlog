import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import LoadingState from "../components/ui/LoadingState";
import EmptyState from "../components/ui/EmptyState";
import Button from "../components/ui/Button";
import * as postService from "../services/postService";

function AdminDashboardPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [syncMessage, setSyncMessage] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    // Load posts data from service
    const fetchPosts = async () => {
      try {
        const allPosts = await postService.getAllPosts();
        console.log("Fetched posts:", allPosts);
        setPosts(allPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setError("Failed to load posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [navigate]);

  const handleDeletePost = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await postService.deletePost(id);
        setPosts(posts.filter(post => post.id !== id));
      } catch (error) {
        console.error("Failed to delete post:", error);
        alert("Failed to delete post: " + error.message);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // 导出数据
  const handleExportData = async () => {
    try {
      setSyncMessage({ type: 'info', text: '正在准备导出数据...' });
      await postService.exportData();
      setSyncMessage({ type: 'success', text: '数据已导出！' });
      setTimeout(() => setSyncMessage(null), 3000);
    } catch (error) {
      console.error('导出数据失败:', error);
      setSyncMessage({ type: 'error', text: `导出失败: ${error.message}` });
    }
  };

  // 导入数据
  const handleImportData = () => {
    // 触发文件选择对话框
    fileInputRef.current.click();
  };

  // 处理文件选择
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setSyncMessage({ type: 'info', text: '正在导入数据...' });
      
      // 读取文件内容
      const reader = new FileReader();
      
      reader.onload = async (event) => {
        try {
          const result = await postService.importData(event.target.result);
          setSyncMessage({ type: 'success', text: `成功导入 ${result.count} 篇文章！` });
          
          // 重新加载文章列表
          const allPosts = await postService.getAllPosts();
          setPosts(allPosts);
          
          setTimeout(() => setSyncMessage(null), 3000);
        } catch (importError) {
          console.error('导入数据失败:', importError);
          setSyncMessage({ type: 'error', text: `导入失败: ${importError.message}` });
        }
      };
      
      reader.onerror = () => {
        setSyncMessage({ type: 'error', text: '读取文件失败。' });
      };
      
      reader.readAsText(file);
    } catch (error) {
      console.error('处理导入文件时出错:', error);
      setSyncMessage({ type: 'error', text: `导入失败: ${error.message}` });
    }
    
    // 重置文件输入，以便同一文件可以再次选择
    e.target.value = null;
  };

  // 文章数量统计
  const publishedCount = posts.filter(post => post.status === 'published').length;
  const draftCount = posts.filter(post => post.status === 'draft').length;

  return (
    <AdminLayout title="Dashboard">
      {/* 同步控制区域 */}
      <div className="mb-8 bg-sepia-lightest/50 p-4 rounded-lg border border-sepia-light/20">
        <div className="flex flex-wrap items-center justify-between">
          <div className="mb-2 sm:mb-0">
            <h3 className="text-sm font-medium text-sepia-dark">数据同步</h3>
            <p className="text-xs text-sepia-muted">导出或导入博客数据，以便在不同设备间同步</p>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="secondary" 
              size="sm"
              onClick={handleExportData}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              }
            >
              导出数据
            </Button>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={handleImportData}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              }
            >
              导入数据
            </Button>
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              accept=".json" 
              onChange={handleFileChange} 
            />
          </div>
        </div>
        
        {syncMessage && (
          <div className={`mt-2 p-2 text-sm rounded ${
            syncMessage.type === 'success' ? 'bg-green-50 text-green-700' : 
            syncMessage.type === 'error' ? 'bg-red-50 text-red-700' : 
            'bg-blue-50 text-blue-700'
          }`}>
            {syncMessage.text}
          </div>
        )}
      </div>
      
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-sepia-lightest/70 p-4 rounded-lg border border-sepia-light/20 shadow-sm">
          <h3 className="text-sm text-sepia-muted mb-1">Total Posts</h3>
          <p className="text-2xl font-serif text-sepia-dark">{posts.length}</p>
        </div>
        <div className="bg-sepia-lightest/70 p-4 rounded-lg border border-sepia-light/20 shadow-sm">
          <h3 className="text-sm text-sepia-muted mb-1">Published</h3>
          <p className="text-2xl font-serif text-sepia-dark">{publishedCount}</p>
        </div>
        <div className="bg-sepia-lightest/70 p-4 rounded-lg border border-sepia-light/20 shadow-sm">
          <h3 className="text-sm text-sepia-muted mb-1">Drafts</h3>
          <p className="text-2xl font-serif text-sepia-dark">{draftCount}</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-serif text-sepia-dark">All Posts</h2>
        <Button 
          to="/admin/post/new" 
          variant="primary"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          }
        >
          New Post
        </Button>
      </div>

      {loading ? (
        <LoadingState message="Loading your posts..." />
      ) : error ? (
        <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-red-700 mb-6">
          <p>{error}</p>
          <Button 
            onClick={() => window.location.reload()} 
            variant="secondary"
            className="mt-2"
          >
            Try Again
          </Button>
        </div>
      ) : posts.length === 0 ? (
        <EmptyState 
          title="No posts yet"
          description="Create your first blog post to get started."
          actionText="Create a new post"
          actionLink="/admin/post/new"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          }
        />
      ) : (
        <div className="overflow-hidden bg-sepia-lightest/70 rounded-lg border border-sepia-light/20">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-sepia-light/30">
              <thead>
                <tr className="bg-sepia-light/10">
                  <th className="px-6 py-3 text-left text-xs font-medium text-sepia-dark uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-sepia-dark uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-sepia-dark uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-sepia-dark uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sepia-light/20">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-sepia-light/5 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-sepia-dark">{post.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-sepia-muted">{formatDate(post.date)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {post.status === 'published' ? (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-green-100 text-green-800">
                          Published
                        </span>
                      ) : (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-yellow-100 text-yellow-800">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          to={`/admin/post/${post.id}`}
                          className="text-sepia-dark"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-900 hover:bg-red-50"
                          onClick={() => handleDeletePost(post.id)}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          href={`/post/${post.id}`}
                          target="_blank"
                          className="text-sepia-dark"
                        >
                          View
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default AdminDashboardPage; 