"use client";
import { FC } from "react";
import scss from "./SignInPage.module.scss";
import Image from "next/image";
import { GoX } from "react-icons/go";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

export const SignInPage: FC = () => {
  const router = useRouter();
  return (
    <section className={scss.SignInPage}>
      <Image
        src="/unsplash_XHBCqZGZre0.svg"
        alt="image"
        width={640}
        height={1024}
      />
      <div className={scss.Home}>
        <div className={scss.block}>
        <button className={scss.home} onClick={() => router.push("/")}>
          <GoX />
        </button>
        <div className={scss.blog}>
          <h1>Добро пожаловать</h1>
          <div className={scss.box}>
            <input type="text" placeholder="Почта" />
            <input type="text" placeholder="Пароль" />
            <a href="">Забыли пароль?</a>
          </div>
          <div className={scss.Buttons}>
            <button className={scss.signUp}>Ввойти</button>

              <div className={scss.register}>
                <p>У вас нет аккаунта?</p>
                <button onClick={() => router.push("/sign-up")}>Зарегистрироваться</button>
              </div>
            <div className={scss.or}>
              <div className={scss.line}></div>
              <p>или</p>
              <div className={scss.line}></div>
            </div>

            <div className={scss.site}>
              <button className={scss.google}>
                <FcGoogle size={20} />
                Google
              </button>

              <button className={scss.facebook}>
                <FaFacebookF size={16} color="#23a6f0" />
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};
