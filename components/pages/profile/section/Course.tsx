"use client";
import { FC, useEffect, useState } from "react";
import scss from "./Course.module.scss";
import { getPopular } from "@/api/course/popularApi";
import { useGetCategories } from "@/api/category";
import {
  useGetFavorites,
  useAddFavorite,
  useRemoveFavorite,
} from "@/api/favorite";
import { useFavoriteStore } from "@/store/favorite.store";
import { useAuthStore } from "@/store/auth.store";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { SlArrowRight } from "react-icons/sl";
import { useRouter } from "next/navigation";

type PopularType = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  categoryId: number;
};

const Course: FC = () => {
  const [products, setProducts] = useState<PopularType[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const router = useRouter();
  const { user } = useAuthStore();
  const { data: categoryData } = useGetCategories();
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
      setProducts(data);
    };
    fetchPopular();
  }, []);

  const categories = categoryData?.data || [];

  const filteredProducts =
    activeCategory === null
      ? products
      : products.filter((item) => item.categoryId === activeCategory);

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
    <section className={scss.Course}>
      <div className={scss.content}>
        <div className={scss.categories}>
          <button
            onClick={() => setActiveCategory(null)}
            className={activeCategory === null ? scss.active : ""}
          >
            Все курсы
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

        <div className={scss.grid}>
          {filteredProducts.length === 0 ? (
            <p className={scss.empty}>Курсы не найдены</p>
          ) : (
            filteredProducts.map((el) => (
              <div key={el.id} className={scss.card}>
                <div className={scss.imageWrapper}>
                  <img
                    src={el.image}
                    alt={el.title}
                    className={scss.cardImage}
                  />
                  <span className={scss.priceTag}>
                    {el.price === 0 ? "Бесплатно" : `${el.price} сом`}
                  </span>

                  <button
                    className={`${scss.heartBtn} ${isFavorite(el.id) ? scss.hearted : ""}`}
                    onClick={(e) => handleHeartClick(e, el.id)}
                  >
                    {isFavorite(el.id) ? (
                      <IoIosHeart size={20} />
                    ) : (
                      <IoIosHeartEmpty size={20} />
                    )}
                  </button>
                </div>

                <div className={scss.cardInfo}>
                  <h2>{el.title}</h2>
                  <p>{el.description}</p>

                  <div className={scss.meta}>
                    <div className={scss.metaItem}>
                      <img src="/populattime.svg" alt="time" />
                      <span>22ч 30мин</span>
                    </div>
                    <div className={scss.metaItem}>
                      <img src="/popularwater.svg" alt="lessons" />
                      <span>64 урока</span>
                    </div>
                    <div className={scss.metaItem}>
                      <img src="/popularimg.svg" alt="progress" />
                      <span>Прогресс</span>
                    </div>
                  </div>

                  <button
                    className={scss.moreBtn}
                    onClick={() => router.push(`/course/${el.id}`)}
                  >
                    Узнать больше <SlArrowRight />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Course;
