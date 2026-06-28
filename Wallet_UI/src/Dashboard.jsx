// import { useState, useEffect } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import "./App.css";

// function Dashboard() {
//   const [receiverId, setReceiverId] = useState("");
//   const [amount, setAmount] = useState("");
//   const [transactions, setTransactions] = useState([]);
//   const [balance, setBalance] = useState(0);
//   const [addAmount, setAddAmount] = useState("");

//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");
//   const username = localStorage.getItem("username");
//   const userId = localStorage.getItem("userId");

//   const API_URL = "http://localhost:8081/api/users";

//   const headers = {
//     Authorization: `Bearer ${token}`
//   };

//   useEffect(() => {
//     if (!token) {
//       navigate("/");
//     } else {
//       getBalance();
//       getTransactions();
//     }
//   }, []);

//   const getBalance = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/${userId}`, { headers });
//       setBalance(res.data.balance);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const getTransactions = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/transactions/${userId}`, { headers });
//       setTransactions(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const addMoney = async () => {
//     if (!addAmount) return alert("Enter amount");
//     try {
//       await axios.post(`${API_URL}/add`, { userId: Number(userId), amount: Number(addAmount) }, { headers });
//       alert("Money added ✅");
//       setAddAmount("");
//       getBalance();
//     } catch (err) {
//       console.log(err);
//   console.log(err.response);
//       alert("Failed ❌");
//     }
//   };

//   const transferMoney = async () => {
//     if (!receiverId || !amount) return alert("Fill all fields");
//     try {
//       await axios.post(`${API_URL}/transfer`, {
//         senderId: Number(userId),
//         receiverId: Number(receiverId),
//         amount: Number(amount)
//       }, { headers });
//       alert("Transfer Successful (G A Y A _P A I S A)💸💸💳");
//       setAmount("");
//       setReceiverId("");
//       getBalance();
//       getTransactions();
//     } catch (err) {
//       alert("Transfer Failed ❌");
//     }
//   };

//   const logout = () => {
//     localStorage.clear();
//     navigate("/");
//   };

//   return (
//     <div className="container">
//       <motion.h1 initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }}>
//         Welcome, {username} 👋
//       </motion.h1>

//       <button onClick={logout} style={{ float: "right" }}>Logout</button>

//       <motion.div className="wallet-card" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
//         <h3>Wallet Balance</h3>
//         <h1>₹{balance}</h1>
//       </motion.div>

//       <motion.div className="card" initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
//         <h2>Add Money</h2>
//         <input placeholder="Amount" value={addAmount} onChange={(e) => setAddAmount(e.target.value)} />
//         <button onClick={addMoney}>Add</button>
//       </motion.div>

//       <motion.div className="card" initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
//         <h2>Send Money</h2>
//         <input placeholder="Receiver ID" value={receiverId} onChange={(e) => setReceiverId(e.target.value)} />
//         <input placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
//         <button onClick={transferMoney}>Send</button>
//       </motion.div>

//       <motion.div className="card" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
//         <h2>Transaction History</h2>
//         {transactions.length === 0 ? <p>No transactions</p> : (
//           transactions.map((t) => (
//             <motion.div key={t.id} className="txn" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
//               <p><b>{t.senderId}</b> ➜ <b>{t.receiverId}</b></p>
//               <p>₹{t.amount}</p>
//               <small>{t.timestamp}</small>
//             </motion.div>
//           ))
//         )}
//       </motion.div>
//     </div>
//   );
// }

// export default Dashboard;

import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [addAmount, setAddAmount] = useState("");

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");

  const API_URL = "http://localhost:8081/api/users";

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      getBalance();
      getTransactions();
    }
  }, []);

  const getBalance = async () => {
    try {
      const res = await axios.get(`${API_URL}/${userId}`, { headers });
      setBalance(res.data.balance);
    } catch (err) {
      console.log(err);
    }
  };

  const getTransactions = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/transactions/${userId}`,
        { headers }
      );
      setTransactions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addMoney = async () => {
    if (!addAmount) return alert("Enter Amount");

    try {
      await axios.post(
        `${API_URL}/add`,
        {
          userId: Number(userId),
          amount: Number(addAmount),
        },
        { headers }
      );

      alert("Money Added ✅");
      setAddAmount("");
      getBalance();
    } catch (err) {
      alert("Failed ❌");
    }
  };

  const transferMoney = async () => {
    if (!receiverId || !amount)
      return alert("Fill all fields");

    try {
      await axios.post(
        `${API_URL}/transfer`,
        {
          senderId: Number(userId),
          receiverId: Number(receiverId),
          amount: Number(amount),
        },
        { headers }
      );

      alert("Transfer Successful 💸");

      setReceiverId("");
      setAmount("");

      getBalance();
      getTransactions();
    } catch (err) {
      alert("Transfer Failed ❌");
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="dashboard">

      {/* HEADER */}

      <motion.div
        className="dashboard-header"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >

        <div>

          <h1 className="dashboard-title">
            Welcome, {username} 👋
          </h1>

          <p className="dashboard-subtitle">
            Manage your Smart Wallet securely.
          </p>

        </div>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </motion.div>

      {/* GRID */}

      <div className="dashboard-grid">

        {/* BALANCE */}

        <motion.div
          className="wallet-card"
          initial={{ scale: .8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >

          <h3>Current Balance</h3>

          <h1>₹{balance}</h1>

          <p>Available Balance</p>

        </motion.div>

        {/* ADD MONEY */}

        <motion.div
          className="dashboard-card"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >

          <h2>Add Money</h2>

          <input
            className="dashboard-input"
            placeholder="Enter Amount"
            value={addAmount}
            onChange={(e) =>
              setAddAmount(e.target.value)
            }
          />

          <button
            className="primary-btn"
            onClick={addMoney}
          >
            Add Money
          </button>

        </motion.div>

        {/* SEND MONEY */}

        <motion.div
          className="dashboard-card"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >

          <h2>Send Money</h2>

          <input
            className="dashboard-input"
            placeholder="Receiver ID"
            value={receiverId}
            onChange={(e) =>
              setReceiverId(e.target.value)
            }
          />

          <input
            className="dashboard-input"
            placeholder="Amount"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
          />

          <button
            className="primary-btn"
            onClick={transferMoney}
          >
            Send Money
          </button>

        </motion.div>

        {/* TRANSACTIONS */}

        <motion.div
          className="dashboard-card transaction-card"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >

          <h2>Recent Transactions</h2>

          {transactions.length === 0 ? (

            <p>No Transactions Yet</p>

          ) : (

            transactions.map((t) => (

              <div
                key={t.id}
                className="transaction-item"
              >

                <div className="transaction-top">

                  <span>
                    #{t.senderId}
                  </span>

                  <span>
                    →
                  </span>

                  <span>
                    #{t.receiverId}
                  </span>

                </div>

                <h3>₹{t.amount}</h3>

                <small>
                  {t.timestamp}
                </small>

              </div>

            ))

          )}

        </motion.div>

      </div>

    </div>
  );
}

export default Dashboard;