"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./SignUpPage.module.scss";
import { useSignUp } from "@/api/user";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { token } from "@/api";
import { useAuthStore } from "@/store/auth.store";

const SignUpPage = () => {
  const router = useRouter();
  const { mutate, isPending, isError, error } = useSignUp();
  const setUser = useAuthStore((s) => s.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreed) {
      alert("Согласитесь с условиями использования");
      return;
    }

    mutate(
      { email, password, name },
      {
        onSuccess: (res) => {
          if (!res.success) {
            alert("Ошибка регистрации");
            return;
          }

          // Проверяем наличие session
          if (!res.data.session) {
            alert("Регистрация успешна! Войдите в систему.");
            router.push("/sign-in");
            return;
          }

          // Сохраняем токены и пользователя
          token.set(res.data.session.access_token);
          token.setRefresh(res.data.session.refresh_token);
          setUser(res.data.user);

          alert("Регистрация успешна!");
          router.push("/");
        },
        onError: (e: any) => {
          const errorMessage = e.response?.data?.error || "Ошибка регистрации";
          alert(errorMessage);
        },
      }
    );
  };

  return (
    <div className={styles.SignUpPage}>
      <div className={styles.but}>
        <button
          className={styles.SignIn}
          onClick={() => router.push("/sign-in")}
        >
          Войти
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.blog}>
          <div className={styles.block}>
            <h1>Регистрация</h1>

            {isError && (
              <p style={{ color: "red", marginBottom: "10px" }}>
                {(error as any)?.response?.data?.error || "Ошибка регистрации"}
              </p>
            )}

            <form onSubmit={handleSubmit}>
              <div className={styles.box}>
                <input
                  placeholder="Имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className={styles.box}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className={`${styles.box} ${styles.passwordBox}`}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Пароль (минимум 6 символов)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <span
                  className={styles.eye}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>

              <label className={styles.agreement}>
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={() => setAgreed(!agreed)}
                  required
                />
                <span className={styles.checkmark}>✓</span>
                Согласен с Условиями использования
              </label>

              <div className={styles.Buttons}>
                <button
                  type="submit"
                  className={styles.signUp}
                  disabled={isPending}
                >
                  {isPending ? "Регистрация..." : "Зарегистрироваться"}
                </button>

                <div className={styles.or}>
                  <div className={styles.line} />
                  или
                  <div className={styles.line} />
                </div>

                <div className={styles.site}>
                  <button type="button">Google</button>
                  <button type="button" className={styles.facebook}>
                    Facebook
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;