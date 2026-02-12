"use client";
import { FC, ReactNode, useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { api, token } from "@/api";

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { setUser, clearUser, isAuth, user } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    console.log("=== AuthProvider useEffect ===");
    console.log("isAuth from store:", isAuth);
    console.log("user from store:", user);
    console.log("access_token:", token.get());
    console.log("refresh_token:", token.getRefresh());
    
    const accessToken = token.get();
    
    if (!accessToken) {
      console.log("❌ No access token found");
      setIsChecking(false);
      return;
    }

    if (isAuth && user) {
      console.log("✅ User already in store, skipping /user/me");
      setIsChecking(false);
      return;
    }

    console.log("🔄 Fetching /user/me...");
    api
      .get("/user/me")
      .then((res) => {
        console.log("✅ /user/me success:", res.data);
        setUser(res.data.data);
      })
      .catch((error) => {
        console.log("❌ /user/me error:", error);
        console.log("Error response:", error.response);
        console.log("Error status:", error.response?.status);
 
      })
      .finally(() => {
        console.log("✅ AuthProvider check complete");
        setIsChecking(false);
      });
  }, []);

  if (isChecking) {
    return <div>Загрузка...</div>;
  }

  return <>{children}</>;
};

export default AuthProvider;