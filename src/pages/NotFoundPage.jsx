import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

// 装饰性分隔符
const OrnamentalDivider = ({ symbol = "❖" }) => (
  <div className="ornamental-divider">
    <span className="px-2">{symbol}</span>
  </div>
);

const NotFoundPage = () => {
  return (
    <MainLayout>
      <div className="container-wrapper text-center py-16">
        <div className="scroll-container max-w-2xl mx-auto py-12">
          <h1 className="text-8xl font-serif font-light text-sepia-dark mb-4">
            404
          </h1>
          <OrnamentalDivider symbol="※" />
          <h2 className="text-2xl font-serif font-normal text-sepia-dark mb-8">
            Page Not Found
          </h2>
          <p className="text-sepia mb-10 max-w-md mx-auto">
            The manuscript you seek appears to be missing from our archives.
          </p>
          <Link
            to="/"
            className="inline-flex items-center text-sm font-medium text-sepia-dark hover:text-sepia-darkest border-b border-sepia-light pb-1"
          >
            Return to the Main Scroll
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
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
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFoundPage;
