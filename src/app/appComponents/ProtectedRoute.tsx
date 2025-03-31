"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const authState = useSelector((state: RootState) => state.authState);
  const { isLoggedIn } = authState;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 100));

        if (!isLoggedIn) {
          window.location.href = "/admin/login";
          return;
        }

        setIsChecking(false);
      } catch (error) {
        window.location.href = "/admin/login";
      }
    };

    checkAuth();
  }, [isLoggedIn]);

  if (isChecking) {
    return (
      <div className="flex items-center justify-center h-[100vh] bg-white">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-3"></div>
          <p className="text-gray-500">Verifying access...</p>
        </div>
      </div>
    );
  }

  return isLoggedIn ? <>{children}</> : null;
}
