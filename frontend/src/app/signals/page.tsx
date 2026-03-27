import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main ...>
      
      ...

      <button
        onClick={() => router.push("/signals")}
        style={{
          marginTop: "30px",
          padding: "12px 24px",
          background: "#22c55e",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "pointer"
        }}
      >
        Sinyalleri Gör
      </button>

    </main>
  );
}
