// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   const API_URL = "http://localhost:8081/api/users";

//   const handleLogin = async () => {
//     if (!username || !password) {
//       alert("Fill all fields");
//       return;
//     }

//     try {
//       const res = await axios.post(`${API_URL}/login`, {
//         username,
//         password,
//       });

//       console.log("Login Response:", res.data);

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("username", res.data.username);
//       localStorage.setItem("userId", res.data.userId);

//       alert("Login Successful ✅");

//       navigate("/dashboard");
//     } catch (err) {
//       console.log(err);

//       alert("Invalid Username or Password ❌");
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Smart Wallet</h1>

//       <h2>Login</h2>

//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <button onClick={handleLogin}>
//         Login
//       </button>

//       <p>
//         Don't have an account?{" "}
//         <span
//           style={{ color: "blue", cursor: "pointer" }}
//           onClick={() => navigate("/register")}
//         >
//           Register
//         </span>
//       </p>
//     </div>
//   );
// }

// export default Login;

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const API_URL = "http://localhost:8081/api/users";

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Fill all fields");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/login`, { username, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("userId", res.data.userId);

      navigate("/dashboard");
    } catch (err) {
      alert("Invalid Username or Password ❌");
    }
  };

  return (
    <div className="login-root">

      {/* LEFT PANEL */}
      <div className="login-left">
        <div className="login-left-bg" />
        <div className="login-left-overlay" />
        <div className="login-left-content">
          <div className="login-brand"><span></span></div>
          <div>
           
            <div className="login-left-title">Smart<br />Wallet</div>
             <div className="login-left-label">Your Digital Wallet</div>
            <nav className="login-left-nav">
             
             
            </nav>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="login-right">
        <div className="login-right-inner">

          <h1 className="login-heading">Welcome back</h1>
          <p className="login-sub">Login to access your wallet.</p>

          <div className="login-field">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>

          <div className="login-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>

          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>

          <div className="login-register">
            Don't have an account?{" "}
            <span onClick={() => navigate("/register")}>Register</span>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Login;

   