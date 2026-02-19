"use client";
import scss from "./Popular.module.scss";
import time from "../../../public/populattime.svg";
import water from "../../../public/popularwater.svg";
import img from "../../../public/popularimg.svg";

import { getPopular } from "@/api/course/popularApi";
import { useGetCategories } from "@/api/category";

import { useEffect, useState } from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import Image from "next/image";
import { SlArrowRight } from "react-icons/sl";

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

  return (
    <div className={scss.Popular}>
      <div className={scss.content}>
        <h1>Популярные курсы</h1>

        {/* 🔥 КАТЕГОРИИ */}
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

        {/* 🔥 КАРТОЧКИ */}
        <div className={scss.man}>
          {filteredProducts.map((el) => (
            <div key={el.id} className={scss.block}>
              <img
                src={el.image}
                alt="img"
                width={330}
                height={250}
                style={{ objectFit: "cover" }}
              />

              <h5>{el.price} сом</h5>

              <h4>
                <IoIosHeartEmpty />
              </h4>

              <div className={scss.text}>
                <h2>{el.title}</h2>
                <p>{el.description}</p>

                <div className={scss.icon}>
                  <div className={scss.url}>
                    <Image src={time} alt="im" width={15} />
                    <span>22ч 30мин</span>
                  </div>
                  <div className={scss.url}>
                    <Image src={water} alt="im" width={15} />
                    <span>64 уроков</span>
                  </div>
                  <div className={scss.url}>
                    <Image src={img} alt="im" width={15} />
                    <span>Прогресс</span>
                  </div>
                </div>

                <button>
                  Узнать больше
                  <SlArrowRight />
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
