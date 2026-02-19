"use client";
import { FC, useState } from "react";
import scss from "./Profile.module.scss";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { useGetFavorites, useRemoveFavorite } from "@/api/favorite";
import { IoIosHeart } from "react-icons/io";
import { SlArrowRight } from "react-icons/sl";
import Image from "next/image";
import time from "@/public/populattime.svg";
import water from "@/public/popularwater.svg";
import img from "@/public/popularimg.svg";

type Tab = "courses" | "favorites";

const Profile: FC = () => {
  const { user } = useAuthStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("courses");

  const { data: favoritesData } = useGetFavorites();
  const { mutate: removeFavorite } = useRemoveFavorite();

  const favorites = favoritesData?.data || [];

  return (
    <section className={scss.Profile}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.home}>
            <img src="/Rectangle 29840.svg" alt="" />
            <div className={scss.block}>
              <div className={scss.box}>
                <img
                  className={scss.avatar}
                  src={user?.avatar || "/avatar.svg"}
                  alt={user?.name || "Profile"}
                />
                <div className={scss.text}>
                  <h2>{user?.name}</h2>
                  <p>Студент</p>
                </div>
              </div>
              <button
                className={scss.edit}
                onClick={() => router.push("/edit")}
              >
                Редактировать
              </button>
            </div>
          </div>

          <div className={scss.tabs_section}>
            <div className={scss.tabs}>
              <button
                className={activeTab === "courses" ? scss.tab_active : scss.tab}
                onClick={() => setActiveTab("courses")}
              >
                Мои курсы
              </button>
              <button
                className={
                  activeTab === "favorites" ? scss.tab_active : scss.tab
                }
                onClick={() => setActiveTab("favorites")}
              >
                Избранные
              </button>
            </div>

            {activeTab === "courses" && (
              <div className={scss.cards}>
                <p className={scss.empty}>У вас пока нет курсов</p>
              </div>
            )}

            {activeTab === "favorites" && (
              <div className={scss.cards}>
                {favorites.length === 0 ? (
                  <p className={scss.empty}>
                    Вы ещё не добавили курсы в избранное
                  </p>
                ) : (
                  favorites.map((fav) => (
                    <div key={fav.id} className={scss.card}>
                      <div className={scss.card_img}>
                        <img src={fav.popular.image} alt={fav.popular.title} />
                        <h5>
                          {fav.popular.price === 0
                            ? "Бесплатно"
                            : `${fav.popular.price} сом`}
                        </h5>
                        <h4
                          onClick={() =>
                            removeFavorite({ popularId: fav.popularId })
                          }
                        >
                          <IoIosHeart />
                        </h4>
                      </div>
                      <div className={scss.card_text}>
                        <h2>{fav.popular.title}</h2>
                        <p>{fav.popular.description}</p>
                        <div className={scss.icon}>
                          <div className={scss.url}>
                            <Image src={time} alt="time" width={15} />
                            <span>22ч 30мин</span>
                          </div>
                          <div className={scss.url}>
                            <Image src={water} alt="lessons" width={15} />
                            <span>64 уроков</span>
                          </div>
                          <div className={scss.url}>
                            <Image src={img} alt="progress" width={15} />
                            <span>Прогресс</span>
                          </div>
                        </div>
                        <button className={scss.more_btn}>
                          Узнать больше <SlArrowRight />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
