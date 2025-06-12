"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { loginWithEmail, loginWithGoogle } from "@/services/authService";
import LoginComponent from "@/components/auth/LoginComponent";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push("/dashboard");
    }
  }, [currentUser, router]);

  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      await loginWithEmail(email, password);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error("Google login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginComponent
      onLogin={handleLogin}
      onGoogleLogin={handleGoogleLogin}
      loading={loading}
    />
  );
}
