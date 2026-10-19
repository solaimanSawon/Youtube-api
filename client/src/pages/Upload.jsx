import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Upload = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");
    const [video, setVideo] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleVideoUpload = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("tags", tags);
        formData.append("videoUrl", video);
        formData.append("thumbnailUrl", thumbnail);

        try {
            // await API.post("/video/upload", formData, {
            //     headers: {
            //         "Content-Type": "multipart/form-data",
            //     },
            // });
            await API.post("/video/upload", formData);
            alert("Video uploaded successfully!");
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || err.response?.data?.error || "Video upload failed!");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div style={{ maxWidth: "500px", margin: "30px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
            <h2>Upload Video</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleVideoUpload}>
                <div style={{ marginBottom: "10px" }}>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={{ width: "100%", padding: "8px", marginTop: "4px" }}
                    />
                </div>

                <div style={{ marginBottom: "10px" }}>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows="3"
                        style={{ width: "100%", padding: "8px", marginTop: "4px" }}
                    />
                </div>

                <div style={{ marginBottom: "10px" }}>
                    <label>Category:</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="e.g. Tech, Music, Education"
                        required
                        style={{ width: "100%", padding: "8px", marginTop: "4px" }}
                    />
                </div>

                <div style={{ marginBottom: "10px" }}>
                    <label>Tags (comma separated):</label>
                    <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="e.g. coding, js, react"
                        required
                        style={{ width: "100%", padding: "8px", marginTop: "4px" }}
                    />
                </div>

                <div style={{ marginBottom: "10px" }}>
                    <label>Video File (MP4):</label>
                    <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => setVideo(e.target.files[0])}
                        required
                        style={{ marginTop: "4px" }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label>Thumbnail Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setThumbnail(e.target.files[0])}
                        required
                        style={{ marginTop: "4px" }}
                    />
                </div>

                <button type="submit" disabled={loading} style={{ width: "100%", padding: "10px", background: "#ff0000", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "bold" }}>
                    {loading ? "Uploading to Cloudinary... (Wait a moment)" : "Upload Video"}
                </button>
            </form>
        </div>
    );
};

export default Upload;