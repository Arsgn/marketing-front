"use client";
import Image from "next/image";
import scss from "./Rating.module.scss";
const Rating = () => {
  return (
    <div>
      <div className={scss.Rating}>
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
      </div>
    </div>
  );
};

export default Rating;
