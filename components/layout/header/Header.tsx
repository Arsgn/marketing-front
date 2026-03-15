"use client";
import { FC, useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    signOut.mutate(undefined, {
      onSuccess: () => {
        clearUser();
        token.remove();
        router.push("/");
        setIsOpen(false);
      },
    });
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <header className={scss.Header}>
      <div className="container">
        <div className={scss.content}>
          <h2>Logo</h2>

          <nav>
            <Link href="/home">Главная</Link>
            <Link href="/home/about">О нас</Link>
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

          {/* Бургер */}
          <button
            className={`${scss.burger} ${isOpen ? scss.open : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Меню"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Затемнение */}
      <div
        className={`${scss.overlay} ${isOpen ? scss.open : ""}`}
        onClick={closeMenu}
      />

      {/* Мобильное меню */}
      <div className={`${scss.mobileMenu} ${isOpen ? scss.open : ""}`}>
        <Link href="/home" onClick={closeMenu}>Главная</Link>
        <Link href="/home/about" onClick={closeMenu}>О нас</Link>
        <Link href="/kursy" onClick={closeMenu}>Курсы</Link>
        <Link href="/profile" onClick={closeMenu}>Контакты</Link>

        {!isAuth ? (
          <div className={scss.mobileButtons}>
            <button
              className={scss.SignIn}
              onClick={() => { router.push("/sign-in"); closeMenu(); }}
            >
              Войти
            </button>
            <button
              className={scss.Join}
              onClick={() => { router.push("/sign-up"); closeMenu(); }}
            >
              Присоединяйся
            </button>
          </div>
        ) : (
          <div className={scss.mobileProfile}>
            <img
              src={user?.avatar || "/avatar.png"}
              onClick={() => { router.push("/profile"); closeMenu(); }}
            />
            <span>{user?.name}</span>
            <button onClick={handleLogout}>Выйти</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;