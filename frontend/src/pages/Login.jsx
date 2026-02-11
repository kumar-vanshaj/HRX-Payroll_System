import { useState } from "react";
import api from "../api/client";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");

  const nav = useNavigate();

  const login = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      nav("/dashboard");

    } catch (err) {
      setError(
        err.response?.data?.error ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: "flex",
      height: "85vh",
      justifyContent: "center",
      alignItems: "center"
    }}>

      <div className="form-card">
        <h2>Cloud HRX Login</h2>

        <label>Email</label>
        <input
          value={email}
          onChange={e=>setEmail(e.target.value)}
          placeholder="Enter email"
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          placeholder="Enter password"
        />

        {error && (
          <div style={{color:"red", marginTop:8}}>
            {error}
          </div>
        )}

        <button
          onClick={login}
          disabled={loading}
          style={{marginTop:12, width:"100%"}}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>

    </div>
  );
}
