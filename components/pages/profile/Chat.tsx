import React from "react";
import scss from "./Chat.module.scss";
import Image from "next/image";
import fon3 from "../../../public/fon1Ellipse 1631 (1).svg";
import { CiSearch } from "react-icons/ci";
import Chatsms from "./Chatsms";
import { MdPhone } from "react-icons/md";
import { HiVideoCamera } from "react-icons/hi2";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaMicrophone, FaRegFile } from "react-icons/fa";
import { VscDeviceCamera } from "react-icons/vsc";
import { BsEmojiLaughingFill } from "react-icons/bs";

const Chat = () => {
  return (
    <div className={scss.ChatList}>
      <div className={scss.search}>
        <CiSearch className={scss.CiSearch} />
        Поиск
      </div>
      <div className={scss.content}>
        <div className={scss.chat}>
          <div className={scss.chatCart}>
            <Image src={fon3} alt="img" className={scss.Image} />
            <div className={scss.chatNameBlock}>
              <div className={scss.chatName}>
                <h3>Друзья навеки</h3>
                <p>Привет ребята!</p>
              </div>
              <div className={scss.chatTime}>
                <p> Сегодня, 15:25</p>
              </div>
            </div>
          </div>
          <div className={scss.chatCart}>
            <Image src={fon3} alt="img" className={scss.Image} />
            <div className={scss.chatNameBlock}>
              <div className={scss.chatName}>
                <h3>Друзья навеки</h3>
                <p>Привет ребята!</p>
              </div>
              <div className={scss.chatTime}>
                <p> Сегодня, 15:25</p>
              </div>
            </div>
          </div>
        </div>
        <div className={scss.mainList}>
          <div className={scss.mainline}>
            <div className={scss.mainCart}>
              <div className={scss.mainNameBlock}>
                <Image src={fon3} alt="img" className={scss.Image} />
                <div className={scss.mainName}>
                  <h3>Ира</h3>
                  <p>В сети</p>
                </div>
              </div>
              <div className={scss.icons}>
                <MdPhone />
                <HiVideoCamera />
                <HiOutlineDotsVertical />
              </div>
            </div>
          </div>

          <div className={scss.main}>
            <Chatsms />
          </div>
          <div className={scss.smsinp}>
            <FaRegFile />
            <input type="text" />
            <BsEmojiLaughingFill />
            <VscDeviceCamera />

            <FaMicrophone className={scss.buttonIcon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
