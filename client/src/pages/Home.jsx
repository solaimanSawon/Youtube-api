const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h1>Welcome to YouTube Clone</h1>
      
      {user ? (
        <div style={{ marginTop: "20px" }}>
          <h3>Hello, {user.channelName}! 👋</h3>
          <p>Email: {user.email}</p>
          {user.logoUrl && (
            <img 
              src={user.logoUrl} 
              alt="Logo" 
              style={{ width: "100px", height: "100px", borderRadius: "50%", marginTop: "10px" }} 
            />
          )}
        </div>
      ) : (
        <p>You are not logged in. Please go to /login</p>
      )}
    </div>
  );
};

export default Home;