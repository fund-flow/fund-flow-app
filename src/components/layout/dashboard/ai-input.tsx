"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";

interface AIInputProps {
  onResult: (response: any) => void; // Callback to handle API response
}

export function AIInput({ onResult }: AIInputProps) {
  const [diversification, setDiversification] = useState("medium");
  const [riskTolerance, setRiskTolerance] = useState("medium");
  const [investmentHorizon, setInvestmentHorizon] = useState("long");
  const [amount, setAmount] = useState(1000);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const requestBody = {
      diversification_level: diversification,
      investment_horizon: investmentHorizon,
      risk_tolerance: riskTolerance,
      amount: amount,
    };

    try {
      const response = await fetch("https://autonome.alt.technology/agent-xpbncg/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      onResult(data); // Pass the API response back to the parent component
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-xl p-4 sm:p-6 flex flex-col space-y-4 bg-white shadow-md"
    >
      {/* Diversification Level */}
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Diversification Level</label>
        <select
          value={diversification}
          onChange={(e) => setDiversification(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900 dark:bg-gray-700 dark:text-white focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Risk Tolerance */}
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Risk Tolerance</label>
        <select
          value={riskTolerance}
          onChange={(e) => setRiskTolerance(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900 dark:bg-gray-700 dark:text-white focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Investment Horizon */}
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Investment Horizon</label>
        <select
          value={investmentHorizon}
          onChange={(e) => setInvestmentHorizon(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900 dark:bg-gray-700 dark:text-white focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
        >
          <option value="short">Short (1-6 months)</option>
          <option value="long">Long (6+ months)</option>
        </select>
      </div>

      {/* Investment Amount */}
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Investment Amount ($)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900 dark:bg-gray-700 dark:text-white focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
          min="1"
        />
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Submit Button */}
      <Button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 ease-in-out shadow-md"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Get AI Portfolio Recommendation"}
      </Button>
    </form>
  );
}
