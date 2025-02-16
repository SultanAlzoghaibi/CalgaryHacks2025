"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type PlayerMetrics = {
  driving: number;
  recycling: number;
  energy: number;
  water: number;
  foodWaste: number;
};

type MetricsState = {
  player1: PlayerMetrics;
  player2: PlayerMetrics;
};

export default function EcoTracker() {
  const searchParams = useSearchParams(); // read-only
  const router = useRouter();

  const [metrics, setMetrics] = useState<MetricsState>({
    player1: { driving: 0, recycling: 0, energy: 0, water: 0, foodWaste: 0 },
    player2: { driving: 0, recycling: 0, energy: 0, water: 0, foodWaste: 0 },
  });

  const [showResults, setShowResults] = useState(false);

  // 1️⃣ On mount, parse query params to restore state
  useEffect(() => {
    const initMetrics: MetricsState = {
      player1: {
        driving: parseNum(searchParams.get("p1driving")),
        recycling: parseNum(searchParams.get("p1recycling")),
        energy: parseNum(searchParams.get("p1energy")),
        water: parseNum(searchParams.get("p1water")),
        foodWaste: parseNum(searchParams.get("p1foodWaste")),
      },
      player2: {
        driving: parseNum(searchParams.get("p2driving")),
        recycling: parseNum(searchParams.get("p2recycling")),
        energy: parseNum(searchParams.get("p2energy")),
        water: parseNum(searchParams.get("p2water")),
        foodWaste: parseNum(searchParams.get("p2foodWaste")),
      },
    };
    setMetrics(initMetrics);

    // If "showResults" param is true, restore that
    setShowResults(searchParams.get("showResults") === "true");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  // 2️⃣ Whenever metrics or showResults changes, update the URL
  useEffect(() => {
    updateURL();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metrics, showResults]);

  function parseNum(val: string | null): number {
    return val ? Number(val) : 0;
  }

  function updateURL() {
    // Build a new query string
    const p1 = metrics.player1;
    const p2 = metrics.player2;
    const query = new URLSearchParams({
      p1driving: String(p1.driving),
      p1recycling: String(p1.recycling),
      p1energy: String(p1.energy),
      p1water: String(p1.water),
      p1foodWaste: String(p1.foodWaste),
      p2driving: String(p2.driving),
      p2recycling: String(p2.recycling),
      p2energy: String(p2.energy),
      p2water: String(p2.water),
      p2foodWaste: String(p2.foodWaste),
      showResults: String(showResults),
    });

    // Replace the current route with the updated query
    router.replace(`?${query.toString()}`, { scroll: false });
  }

  function handleChange(
    player: "player1" | "player2",
    metric: keyof PlayerMetrics,
    value: number
  ) {
    setMetrics((prev) => ({
      ...prev,
      [player]: {
        ...prev[player],
        [metric]: value,
      },
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setShowResults(true);
  }

  function calculateEcoScore(player: "player1" | "player2") {
    const data = metrics[player];
    return (
      -data.driving * 2 + // negative
      data.recycling * 5 + // positive
      data.energy * 4 + // positive
      data.water * 3 - // positive
      data.foodWaste * 3 // negative
    );
  }

  function humanJudgment(score: number) {
    if (score > 20) return "Amazing job! You're a true eco hero!";
    if (score > 10) return "Pretty good, keep it up!";
    if (score >= 0) return "Not terrible, but there's room to improve.";
    return "You're harming the planet... Please do better!";
  }

  function totalScoreText() {
    const s1 = calculateEcoScore("player1");
    const s2 = calculateEcoScore("player2");
    const totalScore = s1 + s2;

    if (totalScore < 40) {
      return `Total: ${totalScore}. You're harming the planet... let's see how your impact affects the animals.`;
    }
    return `Total: ${totalScore}. Congrats! You're doing great! The animals will have an easier time.`;
  }

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
                    handleChange("player1", "driving", +e.target.value)
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
                    handleChange("player2", "driving", +e.target.value)
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
                    handleChange("player1", "recycling", +e.target.value)
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
                    handleChange("player2", "recycling", +e.target.value)
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
                    handleChange("player1", "energy", +e.target.value)
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
                    handleChange("player2", "energy", +e.target.value)
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
                    handleChange("player1", "water", +e.target.value)
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
                    handleChange("player2", "water", +e.target.value)
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
                    handleChange("player1", "foodWaste", +e.target.value)
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
                    handleChange("player2", "foodWaste", +e.target.value)
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

// Utility: parse int from query param or default 0
function parseNum(val: string | null): number {
  return val ? Number(val) : 0;
}
