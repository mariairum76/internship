import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLogin } from "../hooks/useLogin";
import useAuthStore from "../store/authStore";

function Login() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();

  const loginStore =
    useAuthStore(
      (state) => state.login
    );

  const loginMutation =
    useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();

    loginMutation.mutate(
      {
        email,
        password,
      },
      {
        onSuccess: (data) => {
          loginStore(
            data.accessToken,
            data.refreshToken
          );

          navigate("/dashboard");
        },
      }
    );
  };

  return (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#f4f4f4",
    }}
  >
    <form
      onSubmit={handleSubmit}
      style={{
        background: "white",
        padding: "30px",
        borderRadius: "10px",
        width: "350px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        Login
      </h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "15px",
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "15px",
        }}
      />

      <button
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "20px",
          cursor: "pointer",
        }}
      >
        Login
      </button>
    </form>
  </div>
);
}

export default Login;