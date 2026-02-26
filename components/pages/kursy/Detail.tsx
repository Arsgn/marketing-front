"use client";

import { useEffect, useState } from "react";
import { getPopularById } from "@/api/course/popularApi";
import scss from "./Detail.module.scss";

type Props = {
  id: string;
};

type PopularType = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
};

const Detail = ({ id }: Props) => {
  const [product, setProduct] = useState<PopularType | null>(null);

  useEffect(() => {
    const fetchOne = async () => {
      const data = await getPopularById(id);
      setProduct(data);
    };
    fetchOne();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className={scss.Detail}>
      <div className={scss.content}>
        <div className={scss.text}>
          <h1>Маркетинг</h1>
          <h5>
            Мы предоставляем множество функций, которые вы можете использовать.
            Постепенное накопление информация
          </h5>
        </div>

        <div className={scss.main}>
          <img src={product.image} alt={product.title} className={scss.image} />
          <div className={scss.num}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
          </div>
        </div>
      </div>

      <div className={scss.videos}>
        {[
          "https://www.youtube.com/embed/aO4Mnz485uM",
          "https://www.youtube.com/embed/QusJ4fpWQwA",
          "https://www.youtube.com/embed/g2nQ4YWKboY",
        ].map((src, i) => (
          <div key={i} className={scss.videoCard}>
            <div className={scss.videoWrapper}>
              <iframe
                src={src}
                title={`YouTube video ${i + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className={scss.videoLabel}>Урок {i + 1}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Detail;