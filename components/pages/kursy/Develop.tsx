import scss from "./Develop.module.scss";
import Image from "next/image";
import person from "../../../public/kursy1.png";
const Develop = () => {
  return (
    <div className={scss.Develop}>
      <div className={scss.content}>
        <div className={scss.main}>
          <h1>
            Развивайте свои навыки с <br />
            помощью онлайн-курсов <br />с онлайн-обучением
          </h1>

          <button>Присоединиться</button>
        </div>
        <div className="">
          <Image src={person} alt="img" />
        </div>
      </div>
    </div>
  );
};

export default Develop;
