import React, { useState } from "react";
import { postData } from "../api/api";
import "../index.css";
import "../App.css";

const FormPage: React.FC = () => {
  const [input, setInputValue] = useState<number>(0);
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await postData({ items: input });
      setResponse(res);
    } catch (e) {
      console.error("Error: " + e);
      setResponse({
        error: "An error occurred while processing your request.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content">
      <h1>Order Pack Calculator</h1>
      <div className="divider"></div>

      <h3>Enter the number of items to be ordered:</h3>

      <form onSubmit={handleSubmit}>
        <label>
            Number of Items: 
        </label>
        <input
          type="number"
          value={input}
          onChange={(e) => setInputValue(Number(e.target.value))}
          placeholder="Enter number of items"
          required
          className="cyan-input"
        />
        <button className="cyan-button" type="submit" disabled={loading}>
          {loading ? "Calculating..." : "Calculate"}
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {response && <pre>
              <div className="divider"></div>

        {JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
};

export default FormPage;
