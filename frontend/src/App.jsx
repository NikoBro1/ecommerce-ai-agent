import { useState } from "react";

function App() {
  const [niche, setNiche] = useState("");
  const [country, setCountry] = useState("");
  const [budget, setBudget] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    setResult("");

    const res = await fetch("https://ecommerce-ai-agent-gj8a.onrender.com/research", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ niche, country, budget }),
    });

    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>AI Product Finder</h1>

      <input
        placeholder="Niche"
        value={niche}
        onChange={(e) => setNiche(e.target.value)}
      /><br /><br />

      <input
        placeholder="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      /><br /><br />

      <input
        placeholder="Budget"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
      /><br /><br />

      <button onClick={generate}>Find Product</button>

      {loading && <p>Loading...</p>}

      <pre style={{ marginTop: 20, whiteSpace: "pre-wrap" }}>
        {result}
      </pre>
    </div>
  );
}

export default App;