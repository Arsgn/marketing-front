"use client";
import { FC } from "react";
import scss from "./Header.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { useSignOut } from "@/api/user";
import { token } from "@/api";

const Header: FC = () => {
  const router = useRouter();
  const { isAuth, user, clearUser } = useAuthStore();
  const signOut = useSignOut();

  const handleLogout = () => {
    signOut.mutate(undefined, {
      onSuccess: () => {
        clearUser();
        token.remove();
        router.push("/");
      },
    });
  };

  return (
    <header className={scss.Header}>
      <div className="container">
        <div className={scss.content}>
          <h2>Logo</h2>

          <nav>
            <Link href="/">Главная</Link>
            <Link href="/about">О нас</Link>
            <Link href="/kursy">Курсы</Link>
            <Link href="/profile">Контакты</Link>
          </nav>

          {!isAuth ? (
            <div className={scss.Buttons}>
              <button
                className={scss.SignIn}
                onClick={() => router.push("/sign-in")}
              >
                Войти
              </button>
              <button
                className={scss.Join}
                onClick={() => router.push("/sign-up")}
              >
                Присоединяйся
              </button>
            </div>
          ) : (
            <div className={scss.profile}>
              <img
                src={user?.avatar || "/avatar.png"}
                onClick={() => router.push("/profile")}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;