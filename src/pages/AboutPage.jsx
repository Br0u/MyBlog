import MainLayout from "../layouts/MainLayout";

// 装饰性分隔符
const OrnamentalDivider = ({ symbol = "❖" }) => (
  <div className="ornamental-divider">
    <span className="px-2">{symbol}</span>
  </div>
);

const AboutPage = () => {
  return (
    <MainLayout>
      <div className="container-wrapper">
        <div className="max-w-3xl mx-auto scroll-container">
          <h1 className="text-4xl font-serif font-light text-sepia-dark mb-8 text-center">
            About Me
          </h1>

          <OrnamentalDivider symbol="◈" />

          <div className="prose prose-lg max-w-none text-sepia">
            <p className="text-lg leading-relaxed first-letter:text-3xl first-letter:font-serif first-letter:text-sepia-dark first-letter:float-left first-letter:mr-2">
              Welcome to my blog! I'm Brou, a passionate developer interested in
              web development, programming, and sharing knowledge with the
              community.
            </p>

            <p className="text-lg leading-relaxed">
              This blog is built with React, utilizing libraries like React
              Router for navigation and react-markdown for rendering Markdown
              content. The styling is done with Tailwind CSS, a utility-first
              CSS framework.
            </p>

            <h2 className="text-2xl font-serif font-normal text-sepia-dark mt-10 mb-4 border-b border-sepia-light/30 pb-2">
              My Skills
            </h2>
            <ul className="space-y-2">
              <li>Frontend Development (React, Vue.js)</li>
              <li>Backend Development (Node.js, Python)</li>
              <li>Database Design (SQL, MongoDB)</li>
              <li>UI/UX Design</li>
              <li>Project Management</li>
            </ul>

            <h2 className="text-2xl font-serif font-normal text-sepia-dark mt-10 mb-4 border-b border-sepia-light/30 pb-2">
              Contact
            </h2>
            <p className="text-lg leading-relaxed">
              Feel free to reach out to me through email at{" "}
              <a
                href="mailto:contact@broublog.com"
                className="text-sepia-dark hover:text-sepia-darkest border-b border-sepia-light"
              >
                contact@broublog.com
              </a>{" "}
              or connect with me on social media.
            </p>

            <div className="mt-12">
              <OrnamentalDivider symbol="✦" />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutPage;
