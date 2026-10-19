import { useEffect, useState } from "react";
import API from "../api/axios";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await API.get("/video/all");
        setVideos(res.data.videos || res.data); 
      } catch (err) {
        setError("Failed to fetch videos!");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center", marginTop: "50px", color: "#fff" }}>Loading videos... ⏳</h2>;
  }

  if (error) {
    return <h2 style={{ textAlign: "center", marginTop: "50px", color: "red" }}>{error}</h2>;
  }

  return (
    <div style={{ padding: "30px", backgroundColor: "#181818", minHeight: "100vh", color: "#fff" }}>
      <h2 style={{ marginBottom: "20px" }}>Recommended Videos</h2>

      {videos.length === 0 ? (
        <p>No videos uploaded yet!</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {videos.map((video) => (
            <div
              key={video._id}
              style={{
                backgroundColor: "#202020",
                borderRadius: "8px",
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
              }}
            >
              {/* থাম্বনেইল পিকচার */}
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                style={{ width: "100%", height: "170px", objectFit: "cover" }}
              />

              {/* ভিডিও ডিটেইলস */}
              <div style={{ padding: "12px" }}>
                <h3 style={{ fontSize: "16px", margin: "0 0 8px 0", lineHeight: "1.3" }}>
                  {video.title}
                </h3>
                <p style={{ fontSize: "13px", color: "#aaa", margin: "4px 0" }}>
                  Category: {video.category}
                </p>
                <p style={{ fontSize: "12px", color: "#888", margin: "0" }}>
                  Tags: {Array.isArray(video.tags) ? video.tags.join(", ") : video.tags}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;