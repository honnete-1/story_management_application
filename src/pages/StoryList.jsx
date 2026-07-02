import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStories, deleteStory } from "../services/storyService";
import { useAuth } from "../context/AuthContext";

function StoryList() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getStories();
      setStories(Array.isArray(data) ? data : data?.stories ?? []);
    } catch (err) {
      console.error(err);
      setError("Failed to load stories. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this story?");
    if (!confirmDelete) return;

    try {
      await deleteStory(id);
      // Optimistically remove from local state, then refresh from server
      setStories((prev) => prev.filter((s) => s.id !== id));
      loadStories();
    } catch (err) {
      console.error(err);
      alert("Failed to delete story.");
    }
  };

  if (loading) return <h2 className="status">Loading stories...</h2>;

  if (error)
    return (
      <div className="status error">
        <p>{error}</p>
        <button onClick={loadStories}>Retry</button>
      </div>
    );

  return (
    <div>
      <div className="page-header">
        <h2>All Stories</h2>
        <Link to="/add" className="btn btn-primary">
          + New Story
        </Link>
      </div>

      <p className="status">
        {isAuthenticated
          ? "Welcome back! You are logged in."
          : "You are browsing as a guest."}
      </p>

      {stories.length === 0 ? (
        <p className="status">No stories yet. Add your first one!</p>
      ) : (
        <div className="story-grid">
          {stories.map((story) => (
            <div key={story.id} className="story-card">
              <h3>{story.authorName}</h3>
              <p>{story.content?.slice(0, 120)}{story.content?.length > 120 ? "..." : ""}</p>
              <div className="card-actions">
                <Link to={`/stories/${story.id}`} className="btn btn-secondary">
                  View
                </Link>
                <Link to={`/stories/${story.id}/edit`} className="btn btn-secondary">
                  Edit
                </Link>
                <button onClick={() => handleDelete(story.id)} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StoryList;
