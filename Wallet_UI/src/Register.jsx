// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Register() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const API_URL = "http://localhost:8081/api/users";

//   const handleRegister = async () => {
//     if (!username || !password) {
//       alert("Fill all fields");
//       return;
//     }

//     try {
//       await axios.post(`${API_URL}/register`, {
//         username,
//         password,
//         balance: 0,
//       });

//       alert("Registration Successful ✅");
//       navigate("/");
//     } catch (err) {
//       alert("Registration Failed ❌");
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Smart Wallet</h1>

//       <h2>Register</h2>

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

//       <button onClick={handleRegister}>
//         Register
//       </button>

//       <p>
//         Already have an account?{" "}
//         <span
//           style={{ color: "blue", cursor: "pointer" }}
//           onClick={() => navigate("/")}
//         >
//           Login
//         </span>
//       </p>
//     </div>
//   );
// }

// export default Register;

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import wallet_img2 from "./assets/wallet_img2.jpg";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const API_URL = "https://digital-wallet-payment-system.onrender.com/api/users";

  const handleRegister = async () => {
    if (!username || !password || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${API_URL}/register`, {
        username,
        password,
        balance: 0,
      });

      setLoading(false);

      alert("Registration Successful ✅");
      navigate("/");
    } catch (err) {
      setLoading(false);
      alert("Registration Failed ❌");
    }
  };

  return (
    <div
      className="register-page"
      style={{
        backgroundImage: `url(${wallet_img2})`,
      }}
    >
      <div className="overlay">

        <div className="register-card">

          <h1 className="logo">
            Smart Wallet
          </h1>

          <h2>Create Account</h2>

          <p className="subtitle">
            Your money deserves a secure home.
          </p>

          <input
            className="register-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className="register-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            className="register-input"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            className="register-btn"
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "CREATE ACCOUNT"}
          </button>

          <p className="login-link">
            Already have an account?

            <span onClick={() => navigate("/")}>
              Login
            </span>
          </p>

        </div>

      </div>
    </div>
  );
}

export default Register;