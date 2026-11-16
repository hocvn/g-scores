import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/health")
      .then((res) => {
        if (!res.ok) throw new Error("API request failed");
        return res.json();
      })
      .then((data) => setMessage(data.message))
      .catch(console.error);
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">
        React + Node.js + TypeScript
      </h1>
      <p>{message}</p>
    </main>
  );
}

export default App;