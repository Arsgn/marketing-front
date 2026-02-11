"use client";
import { FC, ReactNode, useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { api, token } from "@/api";

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    if (!token.get()) return;

    api
      .get("/user/me")
      .then((res) => {
        setUser(res.data.data);
      })
      .catch(() => {
        token.remove();
      });
  }, [setUser]);

  return <>{children}</>;
};
