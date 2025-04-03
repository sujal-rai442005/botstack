import React, { useState } from "react";
import axios from "axios";

const StackBot = () => {
  const [amount, setAmount] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:5000/suggest", { amount: Number(amount) });
      setResponse(res.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-orange-500 to-white text-white p-6">
      <h1 className="text-3xl font-bold mb-4">🇮🇳 Welcome to StackBot 🇮🇳</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg text-black w-full max-w-md">
        <input
          type="number"
          placeholder="Enter amount (₹)"
          className="w-full p-2 border rounded mb-4"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button className="w-full bg-orange-500 text-white p-2 rounded" onClick={handleSubmit}>
          Get Investment Suggestions
        </button>
        {response && (
          <div className="mt-4">
            <h2 className="text-lg font-bold">Suggestion:</h2>
            <p>{response.suggestion}</p>
            <h2 className="text-lg font-bold mt-2">Stock Market Options:</h2>
            <ul>
              {Object.entries(response.stocks).map(([key, value]) => (
                <li key={key} className="text-sm">{key} - ₹{value.price} ({value.sector})</li>
              ))}
            </ul>
            <h2 className="text-lg font-bold mt-2">Third-Party Investment Apps:</h2>
            <ul>
              {response.apps.map((app, index) => (
                <li key={index} className="text-sm">
                  <a href={app.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    {app.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default StackBot;
