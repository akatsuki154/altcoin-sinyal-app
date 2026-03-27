"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f172a",
        color: "white",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "40px", marginBottom: "20px" }}>
        🚀 Altcoin Sinyal Platformu
      </h1>

      <p style={{ maxWidth: "500px", color: "#cbd5f5" }}>
        Gerçek zamanlı kripto sinyalleri, analizler ve fırsatlar.
      </p>

      <button
        onClick={() => router.push("/signals")}
        style={{
          marginTop: "30px",
          padding: "12px 24px",
          background: "#22c55e",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Sinyalleri Gör
      </button>
    </main>
  );
}
