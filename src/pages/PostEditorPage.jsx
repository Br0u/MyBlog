import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import MDEditor from "@uiw/react-md-editor";
import ImageUploader from "../components/ImageUploader";
import Button from "../components/ui/Button";
import LoadingState from "../components/ui/LoadingState";
import * as postService from "../services/postService";
import "./markdown-styles.css"; // Import the markdown styles

function PostEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNewPost = !id;
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("# Hello Markdown\n\nWrite your blog post here...");
  const [status, setStatus] = useState("draft");
  const [loading, setLoading] = useState(!isNewPost);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    // 确保 MDEditor 正确初始化
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-color-mode', 'light');
    }
    
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    // If editing an existing post, fetch its data
    if (!isNewPost) {
      const fetchPost = async () => {
        try {
          const post = postService.getPostById(id);
          
          if (post) {
            setTitle(post.title);
            setContent(post.content);
            setStatus(post.status);
          } else {
            // If post not found, redirect to dashboard with error
            setError("Post not found. It may have been deleted.");
            // Create a timeout to redirect after showing the error message
            setTimeout(() => {
              navigate("/admin/dashboard");
            }, 3000);
          }
        } catch (err) {
          setError("Failed to load post: " + err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchPost();
    } else {
      // For new posts, ensure we have default values
      setTitle("");
      setContent("# Hello Markdown\n\nWrite your blog post here...");
      setStatus("draft");
      setLoading(false);
    }
  }, [id, isNewPost, navigate]);

  // Update dirty state when content changes
  useEffect(() => {
    if (!loading) {
      setIsDirty(true);
    }
  }, [title, content, status, loading]);

  const handleSave = async () => {
    if (!title.trim()) {
      setError("Please enter a title");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const postData = {
        title,
        content,
        status
      };

      if (isNewPost) {
        // Create new post
        postService.createPost(postData);
      } else {
        // Update existing post if it exists
        try {
          const existingPost = postService.getPostById(id);
          
          if (!existingPost) {
            throw new Error("The post you're trying to edit no longer exists. Create a new post instead.");
          }
          
          postService.updatePost(id, postData);
        } catch (err) {
          throw err;
        }
      }
      
      setIsDirty(false);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Failed to save post: " + err.message);
      setSaving(false);
    }
  };

  const handleImageUploaded = (imageUrl) => {
    // Insert the image URL into the markdown content at cursor position
    // For simplicity, we'll just append it to the end for now
    setContent(prevContent => `${prevContent}\n\n![Uploaded Image](${imageUrl})`);
    setShowImageUploader(false);
  };

  if (loading) {
    return (
      <AdminLayout title={isNewPost ? "Create Post" : "Edit Post"}>
        <LoadingState message="Loading post..." />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout 
      title={isNewPost ? "Create Post" : "Edit Post"}
    >
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        </div>
      )}

      <div className="bg-sepia-lightest/70 border border-sepia-light/20 shadow-sm rounded-lg p-6 mb-6">
        <div className="mb-6">
          <label
            className="block text-sepia-dark text-sm font-medium mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            className="w-full px-4 py-2 border border-sepia-light/30 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-sepia-muted"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            disabled={error.includes("Post not found")}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sepia-dark text-sm font-medium mb-2">
            Status
          </label>
          <select
            className="w-full px-4 py-2 border border-sepia-light/30 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-sepia-muted"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            disabled={error.includes("Post not found")}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sepia-dark text-sm font-medium">
              Content
            </label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowImageUploader(!showImageUploader)}
              disabled={error.includes("Post not found")}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              }
            >
              {showImageUploader ? "Hide Image Uploader" : "Add Image"}
            </Button>
          </div>
          
          {showImageUploader && (
            <div className="mb-4 p-4 bg-white rounded-md border border-sepia-light/20">
              <h3 className="text-sm font-medium mb-2">Upload Image</h3>
              <ImageUploader onImageUploaded={handleImageUploaded} />
            </div>
          )}
          
          <div data-color-mode="light" className="border border-sepia-light/30 rounded-md overflow-hidden">
            <MDEditor
              value={content}
              onChange={setContent}
              height={400}
              preview="edit"
              readOnly={error.includes("Post not found")}
              previewOptions={{
                className: "markdown-body"
              }}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <Button
            variant="secondary"
            onClick={() => navigate("/admin/dashboard")}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={saving || error.includes("Post not found") || !isDirty}
            loading={saving}
            loadingText="Saving..."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
            }
          >
            Save Post
          </Button>
        </div>
      </div>
      
      <div className="bg-sepia-lightest/70 border border-sepia-light/20 shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-serif text-sepia-dark mb-4">Preview</h2>
        <div data-color-mode="light" className="markdown-preview bg-white border border-sepia-light/20 rounded-lg p-6">
          <MDEditor.Markdown 
            source={content} 
            className="markdown-body" 
          />
        </div>
      </div>
    </AdminLayout>
  );
}

export default PostEditorPage; 