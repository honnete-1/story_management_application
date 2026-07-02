import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getStoryById, updateStory } from "../services/storyService";

function EditStory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadStory();
  }, [id]);

  const loadStory = async () => {
    setLoading(true);
    setError("");
    try {
      const story = await getStoryById(id);
      setAuthorName(story.authorName);
      setContent(story.content);
    } catch (err) {
      console.error(err);
      setError("Failed to load story.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedStory = { authorName, content };

    setSubmitting(true);
    setError("");

    try {
      await updateStory(id, updatedStory);
      alert("Story updated successfully!");
      navigate(`/stories/${id}`);
    } catch (err) {
      console.error(err);
      setError("Failed to update story. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <h2 className="status">Loading...</h2>;

  return (
    <div className="form-page">
      <Link to={`/stories/${id}`} className="back-link">
        ← Back to story
      </Link>

      <h2>Edit Story</h2>

      <form onSubmit={handleSubmit} className="story-form">
        {error && <p className="form-error">{error}</p>}

        <label htmlFor="authorName">Author Name</label>
        <input
          id="authorName"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
        />

        <label htmlFor="content">Story Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
        />

        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? "Updating..." : "Update Story"}
        </button>
      </form>
    </div>
  );
}

export default EditStory;
