"use client";
import { FC } from "react";
import scss from "./Home.module.scss";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import Join from "../join/Join";

export const Home: FC = () => {
  return (
    <section className={scss.Home}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.block}>
            <h1>Надо много учиться, чтобы знать хоть немного. </h1>
            <p>
              Обеспечьте сеть для всех ваших потребностей легко и весело,
              используя наши курсы.Откройте для себя интересные функции от нас.
            </p>
            <button>Начать</button>
          </div>
          <Image src="/home.svg" alt="home" width={476} height={456} />
        </div>
        {/* section1 */}
        <div className={scss.block_kurs}>
          <div className={scss.box}>
            <Image src="/home1.svg" alt="logo" width={100} height={100} />
            <h4>Пожизненный доступ</h4>
            <br />
            <p>
              Постепенное накопление информация об атомном и мелкомасштабное
              поведение...
            </p>
          </div>
          <div className={scss.box}>
            <Image src="/home2.svg" alt="logo" width={100} height={100} />
            <h4>Сертифицированный преподаватель</h4>
            <br />
            <p>
              Постепенное накопление информация об атомном и мелкомасштабное
              поведение...
            </p>
          </div>
          <div className={scss.box}>
            <Image src="/home3.svg" alt="logo" width={100} height={100} />
            <h4>Обучающие курсы</h4>
            <br />
            <p>
              Постепенное накопление информация об атомном и мелкомасштабное
              поведение...
            </p>
          </div>
        </div>
        {/* section1 */}

        {/* seection 2 */}
        <div className={scss.infor_block}>
          <div className={scss.name_kurs}>
            <div className={scss.kurs_box}>
              <h1>Почему (название кур.)</h1>
              <p>
                Мы предоставляем множество функций, которые вы можете
                использовать. Постепенное накопление информация{" "}
              </p>
            </div>

            <div className={scss.kurs_box}>
              <h2>100+</h2>
              <p>
                Мы предоставляем множество функций, которые вы можете
                использовать. Постепенное накопление информация{" "}
              </p>
            </div>
            <div className={scss.kurs_box}>
              <h2>50+</h2>
              <p>
                Мы предоставляем множество функций, которые вы можете
                использовать. Постепенное накопление информация{" "}
              </p>
            </div>
          </div>
          <div className={scss.infor_box}>
            <div className={scss.information}>
              <Image src="/home4.svg" alt="logo" width={80} height={100} />
              <div className={scss.infor}>
                <h3>Личное обучение</h3>
                <p>
                  Постепенное накопление информация об атомном и мелкомасштабное
                  поведение...
                </p>
              </div>
            </div>
            <div className={scss.information}>
              <Image src="/home5.svg" alt="logo" width={80} height={100} />
              <div className={scss.infor}>
                <h3>Личное обучение</h3>
                <p>
                  Постепенное накопление информация об атомном и мелкомасштабное
                  поведение...
                </p>
              </div>
            </div>
            <div className={scss.information}>
              <Image src="/home6.svg" alt="logo" width={80} height={100} />
              <div className={scss.infor}>
                <h3>Личное обучение</h3>
                <p>
                  Постепенное накопление информация об атомном и мелкомасштабное
                  поведение...
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* seection 2 */}

        {/* section3 */}
        <div className={scss.Available_courses}>
          <h1>Доступные курсы</h1>
          <p>
            Мы предоставляем множество функций, которые вы можете использовать.
            Постепенное накопление информация{" "}
          </p>
          <br />
          <br />
          <div className={scss.Available_box}>
            <div className={scss.Available}>
              <Image src="/home7.svg" alt="logo" width={310} height={320} />
              <CiHeart className={scss.heart} />
              <h3>Как ставить о оценивать задачи</h3>
              <span>
                Мы ориентируемся на эргономику и ты где работаешь. Это всего
                лишь нажатие клавиши.
              </span>
              <div className={scss.icon}>
                <Image src="/home8.svg" alt="logo" width={80} height={40} />
                <Image src="/home9.svg" alt="logo" width={80} height={40} />
                <Image src="/home10.svg" alt="logo" width={80} height={40} />
              </div>
              <button>Узнать больше</button>
            </div>
            <div className={scss.Available}>
              <Image src="/home7.svg" alt="logo" width={310} height={320} />
              <h3>Как ставить о оценивать задачи</h3>
              <span>
                Мы ориентируемся на эргономику и ты где работаешь. Это всего
                лишь нажатие клавиши.
              </span>
              <div className={scss.icon}>
                <Image src="/home8.svg" alt="logo" width={80} height={40} />
                <Image src="/home9.svg" alt="logo" width={80} height={40} />
                <Image src="/home10.svg" alt="logo" width={80} height={40} />
              </div>
              <button>Узнать больше</button>
            </div>
            <div className={scss.Available}>
              <Image src="/home7.svg" alt="logo" width={310} height={320} />
              <h3>Как ставить о оценивать задачи</h3>
              <span>
                Мы ориентируемся на эргономику и ты где работаешь. Это всего
                лишь нажатие клавиши.
              </span>
              <div className={scss.icon}>
                <Image src="/home8.svg" alt="logo" width={80} height={40} />
                <Image src="/home9.svg" alt="logo" width={80} height={40} />
                <Image src="/home10.svg" alt="logo" width={80} height={40} />
              </div>
              <button>Узнать больше</button>
            </div>
          </div>
        </div>
        {/* section3 */}

        {/* section4 */}
        {/* <div className={scss.comment_box}> */}
        <div className={scss.comment_tittle}>
          <h1 style={{ width: "520px", textAlign: "center" }}>
            Нам доверяют тысячи довольных учеников
          </h1>
          <p>
            Мы предоставляем множество функций, которые вы можете использовать.
            Постепенное накопление информация
          </p>
          <br />
          <br />
        </div>
        <div className={scss.Available_comment}>
          <div className={scss.comment_block}>
            <div className={scss.comment}>
              <Image src="/home11.svg" alt="logo" width={100} height={120} />
              <div className={scss.comment_title}>
                <h3>Viezh Robert</h3>
                <span>Poland</span>
              </div>
              <span>4.5 ⭐</span>
            </div>
            <p style={{ textAlign: "start", width: "220px" }}>
              «Вау… Я очень рад использовать этот VPN, он оказался больше, чем
              мои ожидания, и до сих пор не было никаких проблем. (Название)
              всегда лучший».
            </p>
          </div>

          <div className={scss.comment_block}>
            <div className={scss.comment}>
              <Image src="/home11.svg" alt="logo" width={100} height={120} />
              <div className={scss.comment_title}>
                <h3>Viezh Robert</h3>
                <span>Poland</span>
              </div>
              <span>4.5 ⭐</span>
            </div>
            <p style={{ textAlign: "start", width: "220px" }}>
              «Вау… Я очень рад использовать этот VPN, он оказался больше, чем
              мои ожидания, и до сих пор не было никаких проблем. (Название)
              всегда лучший».
            </p>
          </div>
          <div className={scss.comment_block}>
            <div className={scss.comment}>
              <Image src="/home11.svg" alt="logo" width={100} height={120} />
              <div className={scss.comment_title}>
                <h3>Viezh Robert</h3>
                <span>Poland</span>
              </div>
              <span>4.5 ⭐</span>
            </div>
            <p style={{ textAlign: "start", width: "220px" }}>
              «Вау… Я очень рад использовать этот VPN, он оказался больше, чем
              мои ожидания, и до сих пор не было никаких проблем. (Название)
              всегда лучший».
            </p>
          </div>
          {/* </div> */}
        </div>
        <Join />
        {/* section4 */}
      </div>
    </section>
  );
};
