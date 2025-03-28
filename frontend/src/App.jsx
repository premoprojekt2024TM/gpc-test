import React, { useEffect, useState } from "react";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCalculation = async () => {
      try {
        const response = await fetch("http://localhost:8080"); // The URL of your backend
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.text(); // Get the response body as text
        setResult(data); // Store the result in state
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message); // Store the error message in state
      } finally {
        setLoading(false); // Stop loading once the fetch is done
      }
    };

    fetchCalculation();
  }, []); // Empty dependency array means this runs only once when the component mounts

  return (
    <div className="App">
      <h1>Backend Calculation Result</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {result && <p>{result}</p>}
    </div>
  );
}

export default App;
