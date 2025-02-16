"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import crypto from "crypto";

// Fix import path to the correct folder name
import Register from "./(auth)/resgister/page";

// Deterministic hash using SHA-256 (not bcrypt)
function deterministicHash(input: string): string {
  return crypto.createHash("sha256").update(input, "utf8").digest("hex");
}

export default function Home() {
  const router = useRouter();
  const [password, setPassword] = useState("");

  // Generate deterministic hash & redirect
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Always produce the same hash for the same input
      const hashed = deterministicHash(password);
      // redirect to /hash/<theHash>
      router.push(`/hash/${encodeURIComponent(hashed)}`);
    } catch (error) {
      console.error("Error hashing password:", error);
    }
  };

  return (
    <div className="flex flex-col items-start min-h-screen p-8 sm:p-20 bg-black text-green-400 gap-8">
      {/* Existing Register Component */}
      <div className="w-full">
        <Register />
      </div>

      {/* Password-to-Hash Form */}
      <div className="w-full max-w-md bg-black border border-green-600 p-6 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-green-500 text-left">
          Deterministic Hash Your Password
        </h2>
        <form onSubmit={handleSubmit} className="text-left">
          <label className="block font-medium mb-2" htmlFor="password-input">
            Enter a password:
          </label>
          <input
            id="password-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-green-500 bg-black text-green-400 p-2 w-full rounded mb-4"
            required
          />
          <button
            type="submit"
            className="bg-green-700 hover:bg-green-600 text-black font-semibold py-2 px-4 rounded"
          >
            Hash &amp; Redirect
          </button>
        </form>
      </div>
    </div>
  );
}
