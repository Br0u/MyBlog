import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import MainLayout from "../layouts/MainLayout";
import blogPosts from "../data/blogPosts";

// 装饰性分隔符
const OrnamentalDivider = ({ symbol = "❖" }) => (
  <div className="ornamental-divider">
    <span className="px-2">{symbol}</span>
  </div>
);

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const foundPost = blogPosts.find((p) => p.id === parseInt(id));
    if (foundPost) {
      setPost(foundPost);
    } else {
      navigate("/not-found", { replace: true });
    }
  }, [id, navigate]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <div className="container-wrapper">
        <Link
          to="/"
          className="text-sm font-medium text-sepia-muted hover:text-sepia-dark transition-colors duration-200 inline-flex items-center mb-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to all posts
        </Link>

        <article className="max-w-3xl mx-auto scroll-container">
          <header className="mb-10 text-center">
            <div className="text-sm text-sepia-muted mb-2">{post.date}</div>
            <h1 className="text-4xl font-serif font-light text-sepia-dark mb-6">
              {post.title}
            </h1>
            <OrnamentalDivider symbol="◈" />
          </header>

          <div className="blog-content prose prose-lg max-w-none">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          <footer className="mt-12">
            <OrnamentalDivider symbol="✦" />
          </footer>
        </article>
      </div>
    </MainLayout>
  );
};

export default PostPage;
