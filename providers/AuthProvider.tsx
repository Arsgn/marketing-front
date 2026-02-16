"use client";
import { FC, ReactNode, useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { api, token } from "@/api";

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { setUser, clearUser, isAuth, user } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = token.get();

      // Если нет токена, пропускаем проверку
      if (!accessToken) {
        setIsChecking(false);
        return;
      }

      // Если пользователь уже в store, пропускаем запрос
      if (isAuth && user) {
        setIsChecking(false);
        return;
      }

      // Запрашиваем данные пользователя
      try {
        const res = await api.get("/user/me");
        setUser(res.data.data);
      } catch (error: any) {
        console.error("Ошибка при проверке авторизации:", error);
        
        // Если токен недействителен, очищаем данные
        if (error.response?.status === 401) {
          token.remove();
          clearUser();
        }
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, []);

  if (isChecking) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <p>Загрузка...</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthProvider;