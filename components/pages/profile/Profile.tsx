"use client";

import React, { useState } from "react";
import scss from "./Profile.module.scss";
import Image from "next/image";
import frame8 from "../../../public/Logo (1).svg";
import frame9 from "../../../public/Ellipse 1631.svg";

import { GoBell } from "react-icons/go";
import { IoPersonSharp } from "react-icons/io5";
import {
  HiMiniArrowRightStartOnRectangle,
  HiMiniChatBubbleLeftRight,
} from "react-icons/hi2";
import { BiSolidEnvelope } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { FaCircleQuestion } from "react-icons/fa6";

import MyProfile from "./MyProfile";
import Chat from "./Chat";
import Course from "./Course";
import Rating from "./Rating";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile"); // баштапкы таб

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <MyProfile />;
      case "chat":
        return <Chat />;
      case "course":
        return <Course />;
      case "rating":
        return <Rating />;
      default:
        return <MyProfile />;
    }
  };

  return (
    <div className={scss.Profile}>
      <div className={scss.content}>
        <div className={scss.head}>
          <Image src={frame8} alt="img" />
          <div className={scss.profile}>
            <div className={scss.box}>
              <GoBell className={scss.bell} />
            </div>
            <Image src={frame9} width={50} height={40} alt="img" />
          </div>
        </div>

        <div className={scss.blocks}>
          <div className={scss.block}>
            <div className={scss.handbook}>
              <div
                className={`${scss.profile} ${
                  activeTab === "profile" ? scss.active : ""
                }`}
                onClick={() => setActiveTab("profile")}
              >
                <IoPersonSharp />
                <h3>Профиль</h3>
              </div>

              <div
                className={`${scss.profile} ${
                  activeTab === "chat" ? scss.active : ""
                }`}
                onClick={() => setActiveTab("chat")}
              >
                <HiMiniChatBubbleLeftRight />
                <h3>Чат  .</h3>
              </div>

              <div
                className={`${scss.profile} ${
                  activeTab === "course" ? scss.active : ""
                }`}
                onClick={() => setActiveTab("course")}
              >
                <BiSolidEnvelope />
                <h3>Курсы</h3>
              </div>

              <div
                className={`${scss.profile} ${
                  activeTab === "rating" ? scss.active : ""
                }`}
                onClick={() => setActiveTab("rating")}
              >
                <FaStar />
                <h3>Оценить</h3>
              </div>

              <div className={scss.profile}>
                <IoIosSettings />
                <h3>Настройки</h3>
              </div>

              <div className={scss.profile}>
                <FaCircleQuestion />
                <h3>Помощь</h3>
              </div>

              <div className={scss.profile}>
                <HiMiniArrowRightStartOnRectangle />
                <h3>Выйти</h3>
              </div>
            </div>
          </div>

          <div className={scss.main}>{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
