export default function SignalsPage() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#020617",
      color: "white",
      padding: "20px"
    }}>
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>
        📊 Sinyaller
      </h1>

      <div style={{
        background: "#111827",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "10px"
      }}>
        BTC/USDT - LONG 🚀
      </div>

      <div style={{
        background: "#111827",
        padding: "20px",
        borderRadius: "10px"
      }}>
        ETH/USDT - SHORT 🔻
      </div>
    </main>
  );
}
