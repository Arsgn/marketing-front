"use client";
import { FC } from "react";
import scss from "./Header.module.scss";
import Link from "next/link";

export const Header: FC = () => {
  return (
    <header className={scss.Header}>
      <div className="container">
        <div className={scss.content}>
          <h2>Logo</h2>
          <nav>
            <Link href="/">Главная</Link>
            <Link href="">О нас</Link>
            <Link href="">Курсы</Link>
            <Link href="">Контакты</Link>
          </nav>
          <div className={scss.Buttons}>
          <button className={scss.SignIn}>Войти</button>
          <button className={scss.Join}>Присоединяйся</button>
          </div>
        </div>
      </div>
    </header>
  );
};
