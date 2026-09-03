"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      setErrorMsg("Password မှားနေပါတယ်");
    }
  }

  return (
    <div style={{ maxWidth: 320, margin: "60px auto" }}>
      <h1 style={{ fontSize: 20, marginBottom: 20 }}>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 12,
            border: "1px solid #ccc",
            borderRadius: 6,
            boxSizing: "border-box",
          }}
        />
        {errorMsg && (
          <p style={{ color: "red", fontSize: 13, marginBottom: 12 }}>{errorMsg}</p>
        )}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: 10,
            background: "#222",
            color: "#fff",
            border: "none",
            borderRadius: 6,
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
