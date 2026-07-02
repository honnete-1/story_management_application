import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getStoryById } from "../services/storyService";

function StoryDetails() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStory();
  }, [id]);

  const fetchStory = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getStoryById(id);
      setStory(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load story.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h2 className="status">Loading...</h2>;
  if (error) return <p className="status error">{error}</p>;
  if (!story) return <p className="status">Story not found.</p>;

  return (
    <div className="details-page">
      <Link to="/" className="back-link">
        ← Back to all stories
      </Link>

      <h2>{story.authorName}</h2>
      <p className="story-content">{story.content}</p>

      <div className="card-actions">
        <Link to={`/stories/${id}/edit`} className="btn btn-secondary">
          Edit
        </Link>
      </div>
    </div>
  );
}

export default StoryDetails;
