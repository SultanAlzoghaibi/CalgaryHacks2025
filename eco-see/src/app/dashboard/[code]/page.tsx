"use client";

import React, { useState, useEffect } from "react";

interface PlayerMetrics {
  driving: number;
  recycling: number;
  energy: number;
  water: number;
  foodWaste: number;
}

interface MetricsState {
  player1: PlayerMetrics;
  player2: PlayerMetrics;
}

export default function EcoTracker() {
  const [metrics, setMetrics] = useState<MetricsState>({
    player1: { driving: 0, recycling: 0, energy: 0, water: 0, foodWaste: 0 },
    player2: { driving: 0, recycling: 0, energy: 0, water: 0, foodWaste: 0 },
  });

  const [showResults, setShowResults] = useState(false);

  // 1️⃣ On initial load, read from localStorage (if available)
  useEffect(() => {
    const stored = localStorage.getItem("ecoMetrics");
    const storedShowResults = localStorage.getItem("ecoShowResults");
    if (stored) {
      setMetrics(JSON.parse(stored));
    }
    if (storedShowResults === "true") {
      setShowResults(true);
    }
  }, []);

  // 2️⃣ Whenever metrics or showResults changes, save to localStorage
  useEffect(() => {
    localStorage.setItem("ecoMetrics", JSON.stringify(metrics));
    localStorage.setItem("ecoShowResults", showResults.toString());
  }, [metrics, showResults]);

  // Update function for each input
  const handleChange = (
    player: "player1" | "player2",
    metric: keyof PlayerMetrics,
    value: number
  ) => {
    setMetrics((prev) => ({
      ...prev,
      [player]: {
        ...prev[player],
        [metric]: value,
      },
    }));
  };

  // onSubmit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  // Calculate Eco Score
  const calculateEcoScore = (player: "player1" | "player2") => {
    const data = metrics[player];
    return (
      -data.driving * 2 + // 🚗 Hours driving => negative
      data.recycling * 5 + // ♻ KG recycling => positive
      data.energy * 4 + // ⚡ kWh saved => positive
      data.water * 3 - // 💧 liters water => positive
      data.foodWaste * 3 // 🍽️ times wasted => negative
    );
  };

  // Score analysis
  const humanJudgment = (score: number) => {
    if (score > 20) return "Amazing job! You're a true eco hero!";
    if (score > 10) return "Pretty good, keep it up!";
    if (score >= 0) return "Not terrible, but there's room to improve.";
    return "You're harming the planet... Please do better!";
  };

  // Combined text
  const totalScoreText = () => {
    const score1 = calculateEcoScore("player1");
    const score2 = calculateEcoScore("player2");
    const totalScore = score1 + score2;

    if (totalScore < 40) {
      return `Total: ${totalScore}. You're harming the planet... let's see how your impact affects the animals.`;
    }
    return `Total: ${totalScore}. Congrats! You're doing great! The animals will have an easier time.`;
  };

  const score1 = calculateEcoScore("player1");
  const score2 = calculateEcoScore("player2");

  return (
    <div className="max-w-2xl mx-auto p-6 bg-black text-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-green-500 text-center mb-4">
        🌱 Eco Impact Tracker
      </h1>

      <form onSubmit={handleSubmit}>
        <table className="w-full border-collapse border border-gray-700 text-center">
          <thead>
            <tr className="bg-gray-900 text-green-400">
              <th className="p-2 border border-gray-700">Metric</th>
              <th className="p-2 border border-gray-700">Player 1</th>
              <th className="p-2 border border-gray-700">Player 2</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-800 transition">
              <td className="p-2 border border-gray-700">🏎 Hours Driving</td>
              <td className="p-2 border border-gray-700">
                <input
                  type="number"
                  min="0"
                  value={metrics.player1.driving}
                  onChange={(e) =>
                    handleChange("player1", "driving", Number(e.target.value))
                  }
                  className="w-16 bg-gray-900 text-red-400 border border-red-500 rounded text-center"
                />
              </td>
              <td className="p-2 border border-gray-700">
                <input
                  type="number"
                  min="0"
                  value={metrics.player2.driving}
                  onChange={(e) =>
                    handleChange("player2", "driving", Number(e.target.value))
                  }
                  className="w-16 bg-gray-900 text-red-400 border border-red-500 rounded text-center"
                />
              </td>
            </tr>

            <tr className="hover:bg-gray-800 transition">
              <td className="p-2 border border-gray-700">♻ KG Recycled</td>
              <td className="p-2 border border-gray-700">
                <input
                  type="number"
                  min="0"
                  value={metrics.player1.recycling}
                  onChange={(e) =>
                    handleChange("player1", "recycling", Number(e.target.value))
                  }
                  className="w-16 bg-gray-900 text-green-400 border border-green-500 rounded text-center"
                />
              </td>
              <td className="p-2 border border-gray-700">
                <input
                  type="number"
                  min="0"
                  value={metrics.player2.recycling}
                  onChange={(e) =>
                    handleChange("player2", "recycling", Number(e.target.value))
                  }
                  className="w-16 bg-gray-900 text-green-400 border border-green-500 rounded text-center"
                />
              </td>
            </tr>

            <tr className="hover:bg-gray-800 transition">
              <td className="p-2 border border-gray-700">⚡ kWh Saved</td>
              <td className="p-2 border border-gray-700">
                <input
                  type="number"
                  min="0"
                  value={metrics.player1.energy}
                  onChange={(e) =>
                    handleChange("player1", "energy", Number(e.target.value))
                  }
                  className="w-16 bg-gray-900 text-green-400 border border-green-500 rounded text-center"
                />
              </td>
              <td className="p-2 border border-gray-700">
                <input
                  type="number"
                  min="0"
                  value={metrics.player2.energy}
                  onChange={(e) =>
                    handleChange("player2", "energy", Number(e.target.value))
                  }
                  className="w-16 bg-gray-900 text-green-400 border border-green-500 rounded text-center"
                />
              </td>
            </tr>

            <tr className="hover:bg-gray-800 transition">
              <td className="p-2 border border-gray-700">
                💧 Liters Water Saved
              </td>
              <td className="p-2 border border-gray-700">
                <input
                  type="number"
                  min="0"
                  value={metrics.player1.water}
                  onChange={(e) =>
                    handleChange("player1", "water", Number(e.target.value))
                  }
                  className="w-16 bg-gray-900 text-green-400 border border-green-500 rounded text-center"
                />
              </td>
              <td className="p-2 border border-gray-700">
                <input
                  type="number"
                  min="0"
                  value={metrics.player2.water}
                  onChange={(e) =>
                    handleChange("player2", "water", Number(e.target.value))
                  }
                  className="w-16 bg-gray-900 text-green-400 border border-green-500 rounded text-center"
                />
              </td>
            </tr>

            <tr className="hover:bg-gray-800 transition">
              <td className="p-2 border border-gray-700">
                🍽️ Times Food Wasted
              </td>
              <td className="p-2 border border-gray-700">
                <input
                  type="number"
                  min="0"
                  value={metrics.player1.foodWaste}
                  onChange={(e) =>
                    handleChange("player1", "foodWaste", Number(e.target.value))
                  }
                  className="w-16 bg-gray-900 text-red-400 border border-red-500 rounded text-center"
                />
              </td>
              <td className="p-2 border border-gray-700">
                <input
                  type="number"
                  min="0"
                  value={metrics.player2.foodWaste}
                  onChange={(e) =>
                    handleChange("player2", "foodWaste", Number(e.target.value))
                  }
                  className="w-16 bg-gray-900 text-red-400 border border-red-500 rounded text-center"
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mt-6 text-center">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded"
          >
            Calculate Score
          </button>
        </div>
      </form>

      {/* Show results AFTER submitting */}
      {showResults && (
        <div className="mt-6 text-center space-y-4">
          <h2 className="text-xl font-semibold text-green-500">Eco Scores</h2>
          {/* Player 1 */}
          <div>
            <p className="text-lg mb-1 font-bold">
              Player 1 Score: {calculateEcoScore("player1")}
            </p>
            <p className="italic">
              {humanJudgment(calculateEcoScore("player1"))}
            </p>
          </div>
          {/* Player 2 */}
          <div>
            <p className="text-lg mb-1 font-bold">
              Player 2 Score: {calculateEcoScore("player2")}
            </p>
            <p className="italic">
              {humanJudgment(calculateEcoScore("player2"))}
            </p>
          </div>

          {/* Combined Score */}
          <div className="mt-4 font-bold text-green-500 text-lg">
            {totalScoreText()}
          </div>
        </div>
      )}
    </div>
  );
}
