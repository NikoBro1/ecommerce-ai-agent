import { useState } from "react";
import "./App.css";

function App() {
  const [niche, setNiche] = useState("");
  const [country, setCountry] = useState("");
  const [budget, setBudget] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("https://ecommerce-ai-agent-gj8a.onrender.com/research", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ niche, country, budget }),
      });

      const data = await res.json();
      setResult(data.result);
    } catch (error) {
      setResult("Error: Could not connect to backend.");
    }

    setLoading(false);
  }

  function copyResult() {
    navigator.clipboard.writeText(result);
    alert("Copied!");
  }

  return (
    <div className="page">
      <div className="card">
        <h1>AI E-commerce Agent</h1>
        <p className="subtitle">
          Find winning products, ads, prices and marketing plans in seconds.
        </p>

        <div className="form">
          <input
            placeholder="Niche, example: car accessories"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
          />

          <input
            placeholder="Country, example: USA"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />

          <input
            placeholder="Budget, example: 300"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />

          <button onClick={generate} disabled={loading}>
            {loading ? "Researching..." : "Find Product"}
          </button>
        </div>

        {result && (
          <div className="resultBox">
            <div className="resultHeader">
              <h2>AI Result</h2>
              <button className="copyBtn" onClick={copyResult}>
                Copy
              </button>
            </div>

            <div>
  {result.split("=== PRODUCTS ===")[1] && (
    <div className="section">
      <h3>📦 Products</h3>
      <pre>
        {result.split("=== PRODUCTS ===")[1]
          ?.split("=== ADS ===")[0]}
      </pre>
    </div>
  )}

  {result.split("=== ADS ===")[1] && (
    <div className="section">
      <h3>📢 Ads</h3>
      <pre>
        {result.split("=== ADS ===")[1]
          ?.split("=== MARKETING PLAN ===")[0]}
      </pre>
    </div>
  )}

  {result.split("=== MARKETING PLAN ===")[1] && (
    <div className="section">
      <h3>📅 Marketing Plan</h3>
      <pre>
        {result.split("=== MARKETING PLAN ===")[1]}
      </pre>
    </div>
  )}
</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;