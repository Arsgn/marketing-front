import React from "react";
import scss from "./Course.module.scss";
import Image from "next/image";
import fon from "../../../public/fon1Ellipse 1631 (1).svg";
import fon2 from "../../../public/product-cover-76.svg";
import fon3 from "../../../public/fonProfile.svg";
import { PiHeartStraightLight } from "react-icons/pi";
import {
  MdArrowForwardIos,
  MdOutlineAccessAlarm,
  MdOutlinePlayLesson,
} from "react-icons/md";
import { GiProgression } from "react-icons/gi";

const Course = () => {
  return (
    <div className={scss.CourseList}>
      <div className={scss.content}>
        <div className={scss.course}>
          <div className={scss.courseButtons}>
          <button>Все курсы</button>
            <button>Управление компанией</button>
            <button>Командаобразование</button>
            <button>Маркетинг</button>
            <button>Продажи</button>
          </div>
          <div className={scss.courseBlocks}>
            <div className={scss.cart}>
              <div className={scss.cartImg}>
                <Image src={fon2} alt="img" />
                <div className={scss.cartbuttons}>
                  <button>1500 сом</button>
                  <div className={scss.icon}>
                    {" "}
                    <PiHeartStraightLight />
                  </div>
                </div>
              </div>
              <div className={scss.description}>
                <h3>Как ставить о оценивать задачи</h3>
                <p>
                  Мы ориентируемся на эргономику и ты где работаешь. Это всего
                  лишь нажатие клавиши.
                </p>
                <div className={scss.icons}>
                  <div className={scss.icon}>
                    <MdOutlineAccessAlarm style={{ color: "#23a6f0" }} />
                    <p>22ч 30мин</p>
                  </div>
                  <div className={scss.icon}>
                    <MdOutlinePlayLesson style={{ color: "#E77C40" }} />
                    <p>64 уроков</p>
                  </div>
                  <div className={scss.icon}>
                    <GiProgression style={{ color: "#40BB15" }} />
                    <p>Прогресс</p>
                  </div>
                </div>
                <button>
                  Узнать больше <MdArrowForwardIos />
                </button>
              </div>
            </div>
            <div className={scss.cart}>
              <div className={scss.cartImg}>
                <Image src={fon2} alt="img" />
                <div className={scss.cartbuttons}>
                  <button>1500 сом</button>
                  <div className={scss.icon}>
                    {" "}
                    <PiHeartStraightLight />
                  </div>
                </div>
              </div>
              <div className={scss.description}>
                <h3>Как ставить о оценивать задачи</h3>
                <p>
                  Мы ориентируемся на эргономику и ты где работаешь. Это всего
                  лишь нажатие клавиши.
                </p>
                <div className={scss.icons}>
                  <div className={scss.icon}>
                    <MdOutlineAccessAlarm style={{ color: "#23a6f0" }} />
                    <p>22ч 30мин</p>
                  </div>
                  <div className={scss.icon}>
                    <MdOutlinePlayLesson style={{ color: "#E77C40" }} />
                    <p>64 уроков</p>
                  </div>
                  <div className={scss.icon}>
                    <GiProgression style={{ color: "#40BB15" }} />
                    <p>Прогресс</p>
                  </div>
                </div>
                <button>
                  Узнать больше <MdArrowForwardIos />
                </button>
              </div>
            </div>
            <div className={scss.cart}>
              <div className={scss.cartImg}>
                <Image src={fon2} alt="img" />
                <div className={scss.cartbuttons}>
                  <button>1500 сом</button>
                  <div className={scss.icon}>
                    {" "}
                    <PiHeartStraightLight />
                  </div>
                </div>
              </div>
              <div className={scss.description}>
                <h3>Как ставить о оценивать задачи</h3>
                <p>
                  Мы ориентируемся на эргономику и ты где работаешь. Это всего
                  лишь нажатие клавиши.
                </p>
                <div className={scss.icons}>
                  <div className={scss.icon}>
                    <MdOutlineAccessAlarm style={{ color: "#23a6f0" }} />
                    <p>22ч 30мин</p>
                  </div>
                  <div className={scss.icon}>
                    <MdOutlinePlayLesson style={{ color: "#E77C40" }} />
                    <p>64 уроков</p>
                  </div>
                  <div className={scss.icon}>
                    <GiProgression style={{ color: "#40BB15" }} />
                    <p>Прогресс</p>
                  </div>
                </div>
                <button>
                  Узнать больше <MdArrowForwardIos />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
