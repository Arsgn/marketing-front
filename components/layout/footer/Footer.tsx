"use client";
import { FC } from "react";
import scss from "./Footer.module.scss";

export const Footer: FC = () => {
  return (
    <footer className={scss.Footer}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.block}>
            <h1>Logo</h1>
            <p className={scss.text}>
              (Название)— это частная виртуальная сеть с уникальными функциями и
              высоким уровнем безопасности.
            </p>
           <div className={scss.top}>
            <button>.</button>
            <button>.</button>
            <button>.</button>
           </div>
            <p className={scss.Link}>©2020LaslesVPN</p>
          </div>
          <div className={scss.box}>
          <ul>
            <li>Продукт</li>
            <li>Download </li>
            <li>Pricing</li>
            <li>Locations</li>
            <li>Server</li>
            <li>Countries</li>
            <li>Blog</li>
          </ul>
          <ul>
            <li>Engage</li>
            <li>LaslesVPN ?</li>
            <li>FAQ</li>
            <li>Tutorials</li>
            <li>About Us</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
          <ul>
            <li>Earn Money</li>
            <li>Affiliate</li>
            <li>Become Partner</li>
          </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
