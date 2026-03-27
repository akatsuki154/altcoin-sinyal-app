export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "#0f172a",
      color: "white",
      textAlign: "center",
      padding: "20px"
    }}>
      
      <h1 style={{ fontSize: "40px", fontWeight: "bold", marginBottom: "20px" }}>
        🚀 Altcoin Sinyal Platformu
      </h1>

      <p style={{ fontSize: "18px", color: "#cbd5f5", maxWidth: "500px" }}>
        Gerçek zamanlı kripto sinyalleri, analizler ve fırsatlar.
        Yakında çok daha fazlası burada olacak.
      </p>

      <button style={{
        marginTop: "30px",
        padding: "12px 24px",
        background: "#22c55e",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        cursor: "pointer"
      }}>
        Sinyalleri Gör
      </button>

    </main>
  );
}
