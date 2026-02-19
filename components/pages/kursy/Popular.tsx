"use client";
import scss from "./Popular.module.scss";
import mac from "../../../public/pop.svg";
import time from "../../../public/populattime.svg";
import water from "../../../public/popularwater.svg";
import img from "../../../public/popularimg.svg";
import { getPopular } from "@/api/course/popularApi";
import { useEffect, useState } from "react";
import { IoIosHeartEmpty } from "react-icons/io";

import Image from "next/image";
import { SlArrowRight } from "react-icons/sl";

type Popular = {
  id: number;
  title: String;
  description: String;
  price: number;
  image: string;
  categoryId: number;
  category: string;
  reviews: string;
  favorites: string;
};

const Popular = () => {
  const [product, setProduct] = useState<Popular[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getPopular();
      setProduct(data);
    };

    fetchTodos();
  }, []);
  return (
    <div className={scss.Popular}>
      <div className={scss.content}>
        <div className={scss.man}>
          {product.map((el) => (
            <div key={el.id} className={scss.block}>
              <img
                src={el.image}
                alt="img"
                width={330}
                height={250}
                style={{ objectFit: "cover" }}
              />

              <h5>{el.price}сом</h5>

              <h4>
                <IoIosHeartEmpty />
              </h4>
              <div className={scss.text}>
                <h2>{el.title}</h2>
                <p>{el.description}</p>

                <div className={scss.icon}>
                  <div className={scss.url}>
                    <Image
                      src={time}
                      alt="im"
                      width={100}
                      className={scss.time}
                    />
                    <span>22ч 30мин</span>
                  </div>
                  <div className={scss.url}>
                    <Image
                      src={water}
                      alt="im"
                      width={100}
                      className={scss.time}
                    />
                    <span>64 уроков</span>
                  </div>
                  <div className={scss.url}>
                    <Image
                      src={img}
                      alt="im"
                      width={100}
                      className={scss.time}
                    />
                    <span>Прогресс</span>
                  </div>
                </div>

                <button>
                  Узнать больше
                  <SlArrowRight style={{ fontWeight: "500" }} />
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
