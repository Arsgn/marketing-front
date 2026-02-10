"use client"; // Client компонент болгону маанилүү

import React from "react";
import scss from "./Rating.module.scss";
import { LiaStar } from "react-icons/lia";
import { HiOutlineStar } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import Link from "next/link";
const Rating = () => {
  const router = useRouter();

  const goToProfile = () => {
    router.push("/profile");
  };

  return (
    <div className={scss.Rating}>
      <div className={scss.content}>
        <div className={scss.block}>
          <p style={{ cursor: "pointer" }}>
            <Link href="/profile">x</Link>
          </p>
          <h3>Как вам наш курс?</h3>
          <div className={scss.stars}>
            <LiaStar />
            <LiaStar />
            <LiaStar />
            <LiaStar />
            <LiaStar />
          </div>
          <input type="text" placeholder="Комментарий......" />
          <button>Отправить</button>
        </div>
      </div>
    </div>
  );
};

export default Rating;
