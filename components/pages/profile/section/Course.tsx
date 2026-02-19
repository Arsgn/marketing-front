"use client";
import { FC, useEffect, useState } from "react";
import scss from "./Course.module.scss";
import { getPopular } from "@/api/course/popularApi";
import { useGetCategories } from "@/api/category";
import { IoIosHeartEmpty } from "react-icons/io";
import { SlArrowRight } from "react-icons/sl";

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

  const { data: categoryData } = useGetCategories();

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

  return (
    <section className={scss.Course}>
      <div className={scss.content}>

        {/* Категории */}
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

        {/* Карточки курсов */}
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
                  <span className={scss.priceTag}>{el.price} сом</span>
                  <button className={scss.heartBtn}>
                    <IoIosHeartEmpty size={20} />
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

                  <button className={scss.moreBtn}>
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
