"use client";

import { useEffect, useState } from "react";
import { getAvailableById } from "@/api/available/AvailableApi";
import Image from "next/image";
import scss from "./AvailableDetail.module.scss";

type Props = {
  id: string;
};

type AvailableType = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
};

const AvailableDetail = ({ id }: Props) => {
  const [product, setProduct] = useState<AvailableType | null>(null);

  useEffect(() => {
    const fetchOne = async () => {
      const data = await getAvailableById(id);
      setProduct(data);
    };
    fetchOne();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className={scss.AvailableDetail}>
      <div className={scss.content}>
        <div className={scss.name}>
          <h1>Маркетинг</h1>
          <h5>
            Мы предоставляем множество функций, которые вы можете <br />
            использовать. Постепенное накопление информация{" "}
          </h5>
        </div>
        <div className={scss.main}>
          <Image
            src={product.image}
            alt={product.title}
            width={500}
            height={400}
          />

          <div className={scss.text}>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableDetail;
