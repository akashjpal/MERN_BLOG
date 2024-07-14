import { Link } from "react-router-dom";
import "./Home.css";
import useAuthStatus from "../hooks/auth/useAuthStatus";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import SimpleMDE from "react-simplemde-editor";
import "simplemde/dist/simplemde.min.css";
import Showdown from "showdown";

export default function Home() {
  const { state } = useAuthStatus();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedBlog, setExpandedBlog] = useState(null);
  const [markdownValue, setMarkdownValue] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("http://localhost:3000/blogs");
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleExpand = (blog) => {
    setExpandedBlog(blog);
  };

  const converter = new Showdown.Converter();

  const renderMarkdown = (content) => (
    <ReactMarkdown
      components={{
        p: ({ children }) => <p className="trimmed-content">{children}</p>,
        img: ({ src, alt }) => (
          <img src={src} alt={alt} className="blog-image" />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );

  const renderExpandedMarkdown = (content) => (
    <ReactMarkdown
      components={{
        p: ({ children }) => <p>{children}</p>,
        img: ({ src, alt }) => (
          <img src={src} alt={alt} className="blog-image" />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );

  return (
    <div>
     { !state.isAuthenticated && (
      <div style={{ color: 'red', backgroundColor: '#FF7276',padding:'1rem 1.5rem',fontWeight:'bold' }}>
        Please login to create a blog
      </div>
    )}
      <div className="home--navbar">
        <Link className="home--logo" to="/">
          MindBlog
        </Link>
        <div className="home--buttons">
          <div>
            <Link className="auth--buttons" to="/auth/login">
              Login
            </Link>
          </div>
          <div>
            {state.isAuthenticated && (
              <Link className="create--blog--buttons" to="/create">
                Create
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="blog-container">
        {loading && <div>Loading...</div>}
        {!loading && blogs.length === 0 && <div className="blogs-info">No blogs to show</div>}
        {!loading &&
          blogs.map((blog) => (
            <div
              key={blog.BId}
              className="blog-card"
              onClick={() => handleExpand(blog)}
            >
              {renderMarkdown(blog.Content.toString().slice(0, 100))}
              <div>{blog.username}</div>
              <p>{new Date(blog.CreatedAt).toLocaleDateString()}</p>
            </div>
          ))}
      </div>
      {expandedBlog && (
        <div className="expanded-blog">
          <h2>{expandedBlog.title}</h2>
          {renderExpandedMarkdown(expandedBlog.Content)}
          <div className="author-creation-time">
            <p>Author Name: {expandedBlog.username}</p>
            <p>
              Created On:{" "}
              {new Date(expandedBlog.CreatedAt).toLocaleDateString()}
            </p>
          </div>
          <button onClick={() => setExpandedBlog(null)}>Close</button>
        </div>
      )}
    </div>
  );
}
