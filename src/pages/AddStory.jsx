import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createStory } from "../services/storyService";

function AddStory() {
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authorName.trim() || !content.trim()) {
      setError("Please fill in both fields.");
      return;
    }

    const storyData = { authorName, content };

    setSubmitting(true);
    setError("");

    try {
      await createStory(storyData);
      alert("Story created successfully!");
      setAuthorName("");
      setContent("");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Failed to create story. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-page">
      <h2>Add New Story</h2>

      <form onSubmit={handleSubmit} className="story-form">
        {error && <p className="form-error">{error}</p>}

        <label htmlFor="authorName">Author Name</label>
        <input
          id="authorName"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Author Name"
        />

        <label htmlFor="content">Story Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Story Content"
          rows={8}
        />

        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? "Saving..." : "Save Story"}
        </button>
      </form>
    </div>
  );
}

export default AddStory;
