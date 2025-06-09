"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signup } from "./actions";

export function SignupForm() {
  const [state, signUpAction] = useActionState(signup, undefined);

  return (
    <div className="flex justify-center items-center min-h-[60vh] px-4 mt-8">
      <div className="w-full max-w-[400px] bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl border border-pink-100 p-8 animate-fadeInUpShort">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-violet-600 bg-clip-text text-transparent mb-2">
            Join Gaming Heaven
          </h2>
          <p className="text-gray-600">
            Create your account and start collecting games
          </p>
        </div>

        <form action={signUpAction} className="flex flex-col gap-6" noValidate>
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 ml-1"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 
                       focus:border-pink-500 focus:ring-4 focus:ring-pink-100 focus:outline-none 
                       transition-all duration-200 hover:border-gray-300 bg-white shadow-sm"
              defaultValue={state?.email || ""}
            />
            {state?.errors?.email && (
              <p className="text-sm text-red ml-1">{state.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 ml-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a secure password"
              className="border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 
                       focus:border-pink-500 focus:ring-4 focus:ring-pink-100 focus:outline-none 
                       transition-all duration-200 hover:border-gray-300 bg-white shadow-sm"
            />
            {state?.errors?.password && (
              <p className="text-sm text-red ml-1">{state.errors.password}</p>
            )}
          </div>

          <SubmitButton />
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a
              href="/auth/login"
              className="text-pink-600 hover:text-violet-600 font-medium transition-colors duration-200"
            >
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="w-full py-3.5 px-6 bg-gradient-to-r from-pink-600 to-violet-600 text-white font-semibold 
               rounded-xl hover:from-pink-700 hover:to-violet-700 focus:outline-none focus:ring-4 
               focus:ring-pink-200 transition-all duration-200 disabled:from-gray-400 disabled:to-gray-500 
               disabled:cursor-not-allowed shadow-lg transform hover:scale-[1.02] active:scale-[0.98]
               relative overflow-hidden group"
    >
      <span className="relative z-10">
        {pending ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Creating Account...
          </div>
        ) : (
          "Create Account"
        )}
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
    </button>
  );
}
