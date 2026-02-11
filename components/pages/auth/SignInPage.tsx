"use client";

import { FC, useState } from "react";
import scss from "./SignInPage.module.scss";
import { useRouter } from "next/navigation";
import { GoX } from "react-icons/go";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

import { useSignIn } from "@/api/user";
import { useAuthStore } from "@/store/auth.store";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const SignInPage: FC = () => {
  const router = useRouter();
  const signIn = useSignIn();
  const setUser = useAuthStore((s) => s.setUser);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    signIn.mutate(formData, {
      onSuccess: (res) => {
        setUser(res.data.user); // 🔥 важно
        router.push("/");
      },
      onError: (error: any) => {
        alert(error.response?.data?.error || "Ошибка входа");
      },
    });
  };

  return (
    <section className={scss.SignInPage}>
      <img src="/unsplash_XHBCqZGZre0.svg" alt="image" />

      <div className={scss.Home}>
        <div className={scss.block}>
          <button className={scss.home} onClick={() => router.push("/")}>
            <GoX />
          </button>

          <form className={scss.blog} onSubmit={handleSubmit}>
            <h1>Добро пожаловать</h1>

            {signIn.isError && (
              <p className={scss.error}>
                {(signIn.error as any)?.response?.data?.error || "Ошибка входа"}
              </p>
            )}

            <div className={scss.box}>
              <input
                type="email"
                placeholder="Почта"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Пароль"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
              <span
                className={scss.eye}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiFillEyeInvisible className={scss.fit}/> : <AiFillEye className={scss.fit}/>}
              </span>

              <button
                type="button"
                className={scss.forgot}
                onClick={() => router.push("/forgot-password")}
              >
                Забыли пароль?
              </button>
            </div>

            <div className={scss.Buttons}>
              <button
                type="submit"
                className={scss.signIn}
                disabled={signIn.isPending}
              >
                {signIn.isPending ? "Загрузка..." : "Войти"}
              </button>

              <div className={scss.register}>
                <p>У вас нет аккаунта?</p>
                <button type="button" onClick={() => router.push("/sign-up")}>
                  Зарегистрироваться
                </button>
              </div>

              <div className={scss.or}>
                <div className={scss.line}></div>
                <p>или</p>
                <div className={scss.line}></div>
              </div>

              <div className={scss.site}>
                <button type="button" className={scss.google}>
                  <FcGoogle size={20} />
                  Google
                </button>

                <button type="button" className={scss.facebook}>
                  <FaFacebookF size={16} color="#23a6f0" />
                  Facebook
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignInPage;
