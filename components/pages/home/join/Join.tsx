import React from "react";
import scss from "./Join.module.scss";
const Join = () => {
  return (
    <div>
      <div className={scss.Join}>
        <h1>Присоединяйся к нам</h1>
        <p>
          Мы предоставляем множество функций, которые вы можете использовать.
          Постепенное накопление информация{" "}
        </p>
        <div className={scss.email}>
          <input type="text" placeholder="Твой Email" />
          <button>Подписка</button>
        </div>
      </div>
    </div>
  );
};

export default Join;
