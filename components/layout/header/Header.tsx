"use client";
import { FC } from "react";
import scss from "./Header.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Header: FC = () => {
  const router = useRouter();

  return (
    <header className={scss.Header}>
      <div className="container">
        <div className={scss.content}>
          <h2>Logo</h2>
          <nav>
            <Link href="/">Главная</Link>
            <Link href="/about">О нас</Link>
            <Link href="/marketing">Курсы</Link>
            <Link href="">Контакты</Link>
          </nav>
          <div className={scss.Buttons}>
            <button
              className={scss.SignIn}
              onClick={() => router.push("/sign-in")}
            >
              Ввойти
            </button>
            <button className={scss.Join}>Присоединяйся</button>
          </div>
        </div>
      </div>
    </header>
  );
};
