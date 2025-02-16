"use client";

import { useActionState } from "react";
import { register } from "@/actions/auth";
import Link from "next/link";

export default function Register() {
  const [state, action, isPending] = useActionState(register, undefined);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg shadow-lg">
        <h1 className="text-green-400 text-2xl font-bold mb-6 text-center">
          Register
        </h1>

        <form action={action} className="space-y-4">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-green-400 text-sm font-medium"
            >
              Email
            </label>
            <input
              type="text"
              name="email"
              defaultValue={state?.email}
              className="w-full p-2 mt-1 rounded bg-gray-800 border border-gray-700 text-white focus:border-green-400 focus:ring-green-400"
            />
            {state?.errors?.email && (
              <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-green-400 text-sm font-medium"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full p-2 mt-1 rounded bg-gray-800 border border-gray-700 text-white focus:border-green-400 focus:ring-green-400"
            />
            {state?.errors?.password && (
              <div className="mt-1 text-red-500 text-sm">
                <p>Password must:</p>
                <ul className="list-disc list-inside ml-4">
                  {state.errors.password.map((err) => (
                    <li key={err}>{err}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-green-400 text-sm font-medium"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full p-2 mt-1 rounded bg-gray-800 border border-gray-700 text-white focus:border-green-400 focus:ring-green-400"
            />
            {state?.errors?.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit Button & Login Link */}
          <div className="flex items-center justify-between mt-4">
            <button
              disabled={isPending}
              className="w-full py-2 text-center bg-green-500 text-black font-semibold rounded hover:bg-green-400 transition-colors duration-200 disabled:bg-gray-500"
            >
              {isPending ? "Loading..." : "Register"}
            </button>
          </div>

          <div className="text-center mt-4">
            <Link href="/" className="text-green-400 hover:text-green-300">
              or login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
