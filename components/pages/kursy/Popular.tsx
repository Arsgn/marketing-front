import scss from "./Popular.module.scss";
import mac from "../../../public/pop.svg";
import time from "../../../public/populattime.svg";
import water from "../../../public/popularwater.svg";
import img from "../../../public/popularimg.svg";
import Image from "next/image";
import { SlArrowRight } from "react-icons/sl";

const Popular = () => {
  return (
    <div className={scss.Popular}>
      <div className={scss.content}>
        <div className={scss.main}>
          <div className={scss.kursy}>
            <h1>Популярные курсы</h1>
            <p>
              Мы предоставляем множество функций, которые вы можете <br />
              использовать. Постепенное накопление информация
            </p>
          </div>
          <div className={scss.btn}>
            <button>Все курсы</button>
            <button
              style={{
                width: "210px",
                height: "35px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Управление компанией
            </button>
            <button
              style={{
                width: "170px",
                height: "35px",
                display: "flex",
                alignItems: "center",
              }}
            >
              Командаобразование
            </button>
            <button>Маркетинг</button>
            <button>Продажи</button>
          </div>

          <div className={scss.card}>
            <div className={scss.block}>
              <Image src={mac} alt="img" />

              <div className={scss.text}>
                <h2>Как ставить о оценивать задачи</h2>
                <p>
                  Мы ориентируемся на эргономику и <br />
                  ты где работаешь. Это всего лишь <br />
                  нажатие клавиши.
                </p>

                <div className={scss.icon}>
                  <div className={scss.url}>
                    <Image
                      src={time}
                      alt="im"
                      width={100}
                      className={scss.time}
                    />
                    <span>22ч 30мин</span>
                  </div>
                  <div className={scss.url}>
                    <Image
                      src={water}
                      alt="im"
                      width={100}
                      className={scss.time}
                    />
                    <span>64 уроков</span>
                  </div>
                  <div className={scss.url}>
                    <Image
                      src={img}
                      alt="im"
                      width={100}
                      className={scss.time}
                    />
                    <span>Прогресс</span>
                  </div>
                </div>

                <button>
                  Узнать больше
                  <SlArrowRight />
                </button>
              </div>
            </div>

            <div className={scss.block}>
              <Image src={mac} alt="img" />

              <div className={scss.text}>
                <h2>Как ставить о оценивать задачи</h2>
                <p>
                  Мы ориентируемся на эргономику и <br />
                  ты где работаешь. Это всего лишь <br />
                  нажатие клавиши.
                </p>

                <div className={scss.icon}>
                  <div className={scss.url}>
                    <Image
                      src={time}
                      alt="im"
                      width={100}
                      className={scss.time}
                    />
                    <span>22ч 30мин</span>
                  </div>
                  <div className={scss.url}>
                    <Image
                      src={water}
                      alt="im"
                      width={100}
                      className={scss.time}
                    />
                    <span>64 уроков</span>
                  </div>
                  <div className={scss.url}>
                    <Image
                      src={img}
                      alt="im"
                      width={100}
                      className={scss.time}
                    />
                    <span>Прогресс</span>
                  </div>
                </div>

                <button>
                  Узнать больше
                  <SlArrowRight />
                </button>
              </div>
            </div>

            <div className={scss.block}>
              <Image src={mac} alt="img" />

              <div className={scss.text}>
                <h2>Как ставить о оценивать задачи</h2>
                <p>
                  Мы ориентируемся на эргономику и <br />
                  ты где работаешь. Это всего лишь <br />
                  нажатие клавиши.
                </p>

                <div className={scss.icon}>
                  <div className={scss.url}>
                    <Image
                      src={time}
                      alt="im"
                      width={100}
                      className={scss.time}
                    />
                    <span>22ч 30мин</span>
                  </div>
                  <div className={scss.url}>
                    <Image
                      src={water}
                      alt="im"
                      width={100}
                      className={scss.time}
                    />
                    <span>64 уроков</span>
                  </div>
                  <div className={scss.url}>
                    <Image
                      src={img}
                      alt="im"
                      width={100}
                      className={scss.time}
                    />
                    <span>Прогресс</span>
                  </div>
                </div>

                <button>
                  Узнать больше
                  <SlArrowRight />
                </button>
              </div>
            </div>

            <div className={scss.block}>
              <Image src={mac} alt="img" />

              <div className={scss.text}>
                <h2>Как ставить о оценивать задачи</h2>
                <p>
                  Мы ориентируемся на эргономику и <br />
                  ты где работаешь. Это всего лишь <br />
                  нажатие клавиши.
                </p>

                <div className={scss.icon}>
                  <div className={scss.url}>
                    <Image
                      src={time}
                      alt="im"
                      width={100}
                      className={scss.time}
                    />
                    <span>22ч 30мин</span>
                  </div>
                  <div className={scss.url}>
                    <Image
                      src={water}
                      alt="im"
                      width={100}
                      className={scss.time}
                    />
                    <span>64 уроков</span>
                  </div>
                  <div className={scss.url}>
                    <Image
                      src={img}
                      alt="im"
                      width={100}
                      className={scss.time}
                    />
                    <span>Прогресс</span>
                  </div>
                </div>

                <button>
                  Узнать больше
                  <SlArrowRight />
                </button>
              </div>
            </div>

            <div className={scss.block}>
              <Image src={mac} alt="img" />

              <div className={scss.text}>
                <h2>Как ставить о оценивать задачи</h2>
                <p>
                  Мы ориентируемся на эргономику и <br />
                  ты где работаешь. Это всего лишь <br />
                  нажатие клавиши.
                </p>

                <div className={scss.icon}>
                  <div className={scss.url}>
                    <Image
                      src={time}
                      alt="im"
                      width={100}
                      className={scss.time}
                    />
                    <span>22ч 30мин</span>
                  </div>
                  <div className={scss.url}>
                    <Image
                      src={water}
                      alt="im"
                      width={100}
                      className={scss.time}
                    />
                    <span>64 уроков</span>
                  </div>
                  <div className={scss.url}>
                    <Image
                      src={img}
                      alt="im"
                      width={100}
                      className={scss.time}
                    />
                    <span>Прогресс</span>
                  </div>
                </div>

                <button>
                  Узнать больше
                  <SlArrowRight />
                </button>
              </div>
            </div>

            <div className={scss.block}>
              <Image src={mac} alt="img" />

              <div className={scss.text}>
                <h2>Как ставить о оценивать задачи</h2>
                <p>
                  Мы ориентируемся на эргономику и <br />
                  ты где работаешь. Это всего лишь <br />
                  нажатие клавиши.
                </p>

                <div className={scss.icon}>
                  <div className={scss.url}>
                    <Image
                      src={time}
                      alt="im"
                      width={100}
                      className={scss.time}
                    />
                    <span>22ч 30мин</span>
                  </div>
                  <div className={scss.url}>
                    <Image
                      src={water}
                      alt="im"
                      width={100}
                      className={scss.time}
                    />
                    <span>64 уроков</span>
                  </div>
                  <div className={scss.url}>
                    <Image
                      src={img}
                      alt="im"
                      width={100}
                      className={scss.time}
                    />
                    <span>Прогресс</span>
                  </div>
                </div>

                <button>
                  Узнать больше
                  <SlArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popular;
