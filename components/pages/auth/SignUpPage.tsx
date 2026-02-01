"use client";
import { FC } from "react";
import scss from "./SignUpPage.module.scss";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaCheck } from "react-icons/fa";
import { useRouter } from "next/navigation";

export const SignUpPage: FC = () => {
  const router = useRouter();
  return (
    <section className={scss.SignUpPage}>
      <div className={scss.but}>
        <button className={scss.SignIn} onClick={() => router.push("/sign-in")}>
          Войти
        </button>
      </div>

      <div className="container">
        <div className={scss.content}>
          <div className={scss.blog}>
            <div className={scss.block}>
              <h1>Регистрация</h1>

              <div className={scss.box}>
                <p>Имя</p>
                <input type="text" placeholder="Введите свое имя" />
              </div>

              <div className={scss.box}>
                <p>Почта</p>
                <input type="text" placeholder="Введите свою почту" />
              </div>

              <div className={scss.box}>
                <p>Пароль*</p>
                <input type="password" placeholder="Введите свой пароль" />
              </div>

              <label className={scss.agreement}>
                <input type="checkbox" />
                <span className={scss.checkmark}>
                  <FaCheck size={11} />
                </span>
                <span>Согласен с Условиями</span>
              </label>

              <div className={scss.Buttons}>
                <button className={scss.signUp}>Регистрация</button>

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
      </div>
    </section>
  );
};
