"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./SignUpPage.module.scss";
import { useSignUp } from "@/api/user";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const SignUpPage = () => {
  const router = useRouter();
  const { mutate, isPending } = useSignUp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    if (!agreed) return alert("Agree with terms");

    mutate(
      { email, password, name },
      {
        onSuccess: () => {
          router.push("/");
        },
        onError: (e) => {
          alert(e.message);
        },
      }
    );
  };

  return (
    <div className={styles.SignUpPage}>
      <div className={styles.but}>
        <button className={styles.SignIn} onClick={() => router.push("/sign-in")}>
          Войти
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.blog}>
          <div className={styles.block}>
            <h1>Регистрация</h1>

            <div className={styles.box}>
              <input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className={styles.box}>
              <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={`${styles.box} ${styles.passwordBox}`}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              />
              <span className={styles.checkmark}>✓</span>
              Согласен с Условиями
            </label>

            <div className={styles.Buttons}>
              <button
                className={styles.signUp}
                onClick={handleSubmit}
                disabled={isPending}
              >
                {isPending ? "Loading..." : "Войти"}
              </button>

              <div className={styles.or}>
                <div className={styles.line} />
                or
                <div className={styles.line} />
              </div>

              <div className={styles.site}>
                <button>Google</button>
                <button className={styles.facebook}>Facebook</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
