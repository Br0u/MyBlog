import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import blogPosts from "../data/blogPosts";

// 装饰性分隔符
const OrnamentalDivider = ({ symbol = "❖" }) => (
  <div className="ornamental-divider">
    <span className="px-2">{symbol}</span>
  </div>
);

const HomePage = () => {
  return (
    <MainLayout>
      <div className="container-wrapper">
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-serif font-light text-sepia-dark mb-4">
            Welcome to Brou's Blog
          </h1>
          <p className="text-xl text-sepia-muted max-w-2xl mx-auto">
            Thoughts, stories, and ideas about programming, design, and personal
            growth.
          </p>
          <OrnamentalDivider />
        </div>

        <div className="grid grid-cols-1 gap-12 max-w-3xl mx-auto">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="scroll-container border-b border-sepia-light/20 pb-10 last:border-0"
            >
              <div className="text-sm text-sepia-muted mb-2">{post.date}</div>
              <h2 className="text-2xl font-serif font-normal text-sepia-dark mb-3 hover:text-sepia-darkest">
                <Link to={`/post/${post.id}`}>{post.title}</Link>
              </h2>
              <p className="text-sepia mb-4 leading-relaxed">{post.excerpt}</p>
              <Link
                to={`/post/${post.id}`}
                className="text-sm font-medium text-sepia-dark hover:text-sepia-darkest inline-flex items-center group"
              >
                Read more
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
