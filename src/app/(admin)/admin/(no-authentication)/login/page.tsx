"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Head from "next/head";
import { useState } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { BiLoaderAlt } from "react-icons/bi";

// Validation schema with Zod
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 6 characters" }),
});

// Define type for form data
type LoginFormData = z.infer<typeof loginSchema>;

export default function AdminLogin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log("Login attempt:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="h-[100vh] flex items-center justify-center bg-gray-50">
      <Head>
        <title>Admin Login | Dashboard</title>
      </Head>

      {/* Login Form Container - wider and with more padding */}
      <div className="w-[480px] bg-white rounded-lg shadow-sm border border-gray-100 p-10 relative z-10">
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-blue-600 rounded-sm"></div>
            <h2 className="text-blue-600 font-medium">Admin Portal</h2>
          </div>

          <h1 className="text-2xl font-semibold text-gray-800 mt-7">
            Welcome back
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Please sign in to access the admin dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FiMail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              placeholder="Email address"
              type="text"
              {...register("email")}
              className={`w-full pl-10 pr-3 py-3 rounded-md bg-white text-gray-800 border ${
                errors.email
                  ? "border-red-400"
                  : "border-gray-200 focus:border-blue-400"
              } outline-none transition-all`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1.5 ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FiLock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className={`w-full pl-10 pr-10 py-3 rounded-md bg-white text-gray-800 border ${
                errors.password
                  ? "border-red-400"
                  : "border-gray-200 focus:border-blue-400"
              } outline-none transition-all`}
            />
            <div
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1.5 ml-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <BiLoaderAlt className="animate-spin -ml-1 mr-2 h-5 w-5" />
                Signing In
              </>
            ) : (
              <>
                Sign In
                <FiArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 pt-6 border-t border-gray-100">
          <p className="text-xs text-center text-gray-400">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
