import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        alert("Logged out successfully!");
        window.location.href = "/login";
    };

    return (
        <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 30px", background: "#202020", color: "#fff" }}>
            <Link to="/" style={{ color: "#fff", textDecoration: "none", fontSize: "20px", fontWeight: "bold" }}>
                YouTube Clone 🎬
            </Link>

            <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                {user ? (
                    <>
                        <Link to="/upload" style={{ color: "#fff", textDecoration: "none", background: "#cc0000", padding: "6px 12px", borderRadius: "4px" }}>
                            + Upload
                        </Link>
                        <span>{user.channelName}</span>
                        <button onClick={handleLogout} style={{ padding: "6px 12px", background: "#444", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ color: "#fff", textDecoration: "none", padding: "6px 12px", border: "1px solid #fff", borderRadius: "4px" }}>
                            Login
                        </Link>
                        <Link to="/signup" style={{ color: "#28a745", textDecoration: "none", padding: "6px 12px" }}>
                            Signup
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;