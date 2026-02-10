import React from "react";
import scss from "./Chatsms.module.scss";

const Chatsms = () => {
  return (
    <div className={scss.SmschatList}>
      <div className={scss.content}>

        <div className={`${scss.message} ${scss.incoming}`}>
          <p>Привет !</p>
          <span>Today, 2:01pm</span>
        </div>

        <div className={`${scss.message} ${scss.incoming}`}>
          <p>Как твои дела?</p>
          <span>Today, 2:02pm</span>
        </div>

        <div className={`${scss.message} ${scss.outgoing}`}>
          <p>Привеет</p>
          <span>Today, 2:12pm</span>
        </div>

        <div className={`${scss.message} ${scss.outgoing}`}>
          <p>Хорошо</p>
          <span>Today, 2:12pm</span>
        </div>

      </div>
    </div>
  );
};

export default Chatsms;
