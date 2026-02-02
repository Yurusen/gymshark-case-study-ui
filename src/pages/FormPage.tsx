import React, { useState } from "react";
import { postData } from "../api/api";
import "../index.css";
import "../App.css";

const FormPage: React.FC = () => {
  const [input, setInputValue] = useState<number>(0);
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [packSizes, setPackSizes] = useState([0]);
  const [showPackSizes, setShowPackSizes] = useState(false);

  const handlePackChange = (index: number, value: any) => {
    const updated = [...packSizes];
    updated[index] = Number(value);
    setPackSizes(updated);
  };

  const addPack = () => {
    setPackSizes([...packSizes, 0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const validPackSizes = packSizes.filter((p) => p > 0);

    try {
      const res = await postData({
        items: Number(input),
        packSizes: validPackSizes,
      });
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

  const formatPacks = (packs: Record<string, number>) => {
    return Object.entries(packs)
      .filter(([, count]) => count > 0)
      .map(([size, count]) => {
        const plural = count > 1 ? "s" : "";
        return `${count} x ${size} Pack${plural}`;
      });
  };

  const clearAll = () => {
    setShowPackSizes(false);
    setPackSizes([0]);
    setLoading(false);
    setResponse(null);
    setInputValue(0);
  };

  const clearAllCustomPackSizes = () => {
    setPackSizes([0]);
    setShowPackSizes(false);
  };

  const deletePack = (indexToRemove: number) => {
    setPackSizes((prevPacks) =>
      prevPacks.filter((_, index) => index !== indexToRemove),
    );
  };

  return (
    <div className="content">
      <img
        src="https://yurusen.github.io/gymshark-case-study-ui/gymshark_logo.png"
        alt="logo"
        width="450"
        className="gymshark-tint"
      />

      <div className="divider"></div>
      <div className="flexDiv">
        <h1>Order Pack Calculator</h1>
      </div>
      <div className="divider"></div>

      <form onSubmit={handleSubmit}>
        <div>
          <button
            type="button"
            className="cyan-button"
            onClick={() => setShowPackSizes(!showPackSizes)}
          >
            Custom Pack Sizes?
          </button>
        </div>
        {showPackSizes && (
          <div>
            <div className="packsize-row">
              {packSizes.map((pack, index) => (
                <div key={index}>
                  <label className="label">Pack {index + 1}:</label>

                  <input
                    type="number"
                    value={pack}
                    onChange={(e) => handlePackChange(index, e.target.value)}
                    placeholder={`Pack size #${index + 1}`}
                    required
                    className="packsize-input"
                  />

                  <button
                    type="button"
                    onClick={() => deletePack(index)}
                    className="crimson-button"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
            <button type="button" onClick={addPack} className="cyan-button">
              Add Pack
            </button>

            <button
              type="button"
              onClick={clearAllCustomPackSizes}
              className="crimson-button"
            >
              Delete all custom Packs?
            </button>
            <div className="divider"></div>
          </div>
        )}
        <h3>Enter the number of items to be ordered:</h3>

        <label>Number of Items:</label>
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
      {response && (
        <>
          <div className="divider"></div>
          {response.Packs && Object.keys(response.Packs).length > 0 ? (
            <div className="displayFlex">
            <pre className="pack-output">
              {formatPacks(response.Packs).join("\n")}
             
            </pre>
             <button type="button" className="cyan-button" onClick={clearAll}>
                Clear
              </button>
            </div>
          ) : (
            <pre className="pack-output">0 packs</pre>
          )}
        </>
      )}
    </div>
  );
};

export default FormPage;
