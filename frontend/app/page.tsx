"use client";

import { useEffect, useState } from "react";

type ApiResponse = {
  success: boolean;
  message: string;
};

export default function Home() {
  const [message, setMessage] = useState("Connecting to QubitSphere API...");
  const [error, setError] = useState("");

  useEffect(() => {
    async function connectToBackend() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        if (!apiUrl) {
            throw new Error("NEXT_PUBLIC_API_URL is not configured");
        }

        const response = await fetch(`${apiUrl}/api/test`);
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data: ApiResponse = await response.json();

        setMessage(data.message);
      } catch (err) {
        console.error(err);
        setError("Could not connect to the FastAPI backend.");
      }
    }

    connectToBackend();
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>QubitSphere</h1>

      <p style={{ marginTop: "16px" }}>
        Frontend → FastAPI connection test
      </p>

      {error ? (
        <p style={{ marginTop: "24px", color: "red" }}>{error}</p>
      ) : (
        <p style={{ marginTop: "24px", color: "green" }}>{message}</p>
      )}
    </main>
  );
}