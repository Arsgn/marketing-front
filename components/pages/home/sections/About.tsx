import Image from "next/image";
import scss from "./About.module.scss";
import Join from "../join/Join";

const About = () => {
  return (
    <div className="container">

      <div className={scss.about}>
        <h1>
          Мы являемся топливом для вашего бизнеса, готовы дать вам образование и
          поднять ваш бренд до небес.
        </h1>
        <Image
          className={scss.image1}
          src="/home12.svg"
          alt="logo"
          width={300}
          height={300}
        />
      </div>

      <div className={scss.images}>
        <Image className={scss.imageNormal} src="/home14.svg" alt="logo" width={350} height={350} />
        <Image className={scss.imageOffset} src="/home15.svg" alt="logo" width={350} height={350} />
        <Image className={scss.imageNormal} src="/home16.svg" alt="logo" width={350} height={350} />
        <Image className={scss.imageOffset} src="/home17.svg" alt="logo" width={350} height={350} />
      </div>

      <div className={scss.about_box}>
        <h1>Наш основатель</h1>
        <div className={scss.about_tittle}>
          <Image
            className={scss.founderImage}
            src="/home18.svg"
            alt="logo"
            width={330}
            height={280}
          />
          <p>
            Большая история — новое исследовательское направление, в рамках
            которого изучается единый преемственный процесс развития Вселенной —
            с момента Большого взрыва до настоящего времени. Междисциплинарный
            проект The Big History Project был основан Биллом Гейтсом и Дэвидом
            Кристианом с целью разработки целостного курса истории космоса,
            Земли, жизни и человечества и преподавания его во всем мире. Эта
            книга, написанная на стыке естественных и гуманитарных наук —
            физики, геологии, астрономии, истории, социологии и других, —
            насыщенное обобщение новейших научных представлений.
          </p>
        </div>
      </div>

      <Join />
    </div>
  );
};

export default About;