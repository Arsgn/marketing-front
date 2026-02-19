"use client";
import scss from "./Popular.module.scss";
import time from "@/public/populattime.svg";
import water from "@/public/popularwater.svg";
import img from "@/public/popularimg.svg";
import { getPopular } from "@/api/course/popularApi";
import { useGetCategories } from "@/api/category";
import { useEffect, useState } from "react";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import Image from "next/image";
import { SlArrowRight } from "react-icons/sl";
import { useGetFavorites, useAddFavorite, useRemoveFavorite } from "@/api/favorite";
import { useFavoriteStore } from "@/store/favorite.store";
import { useAuthStore } from "@/store/auth.store";

type PopularType = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  categoryId: number;
};

const Popular = () => {
  const [product, setProduct] = useState<PopularType[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const { data: categoryData } = useGetCategories();
  const { user } = useAuthStore();
  const { setFavoriteIds, isFavorite } = useFavoriteStore();

  const { data: favoritesData } = useGetFavorites();
  const { mutate: addFavorite } = useAddFavorite();
  const { mutate: removeFavorite } = useRemoveFavorite();

  useEffect(() => {
    if (favoritesData?.data) {
      setFavoriteIds(favoritesData.data.map((f) => f.popularId));
    }
  }, [favoritesData]);

  useEffect(() => {
    const fetchPopular = async () => {
      const data = await getPopular();
      setProduct(data);
    };
    fetchPopular();
  }, []);

  const categories = categoryData?.data || [];

  const filteredProducts =
    activeCategory === null
      ? product
      : product.filter((item) => item.categoryId === activeCategory);

  const handleHeartClick = (e: React.MouseEvent, popularId: number) => {
    e.stopPropagation();
    if (!user) return alert("Войдите в аккаунт");
    if (isFavorite(popularId)) {
      removeFavorite({ popularId });
    } else {
      addFavorite({ popularId });
    }
  };

  return (
    <div className={scss.Popular}>
      <div className={scss.content}>
        <h1>Популярные курсы</h1>

        <div className={scss.categories}>
          <button
            onClick={() => setActiveCategory(null)}
            className={activeCategory === null ? scss.active : ""}
          >
            Все Курсы
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={activeCategory === cat.id ? scss.active : ""}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className={scss.man}>
          {filteredProducts.map((el) => (
            <div key={el.id} className={scss.block}>
              <div className={scss.img_wrapper}>
                <img src={el.image} alt={el.title} />
                <h5>{el.price === 0 ? "Бесплатно" : `${el.price} сом`}</h5>
                <h4
                  onClick={(e) => handleHeartClick(e, el.id)}
                  className={isFavorite(el.id) ? scss.favorited : ""}
                >
                  {isFavorite(el.id) ? <IoIosHeart /> : <IoIosHeartEmpty />}
                </h4>
              </div>

              <div className={scss.text}>
                <h2>{el.title}</h2>
                <p>{el.description}</p>
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
                <button>
                  Узнать больше <SlArrowRight />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Popular;