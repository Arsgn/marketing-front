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
      <div
        className={scss.contetnt}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          className={scss.text}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <h1
            style={{
              fontFamily: "Rubik",
              fontWeight: "700",
              fontSize: "50px",
              lineHeight: "70px",
              letterSpacing: "0%",
            }}
          >
            Маркетинг
          </h1>
          <h5
            style={{
              fontFamily: "Rubik",
              fontWeight: "400",
              fontSize: "16px",
              lineHeight: "30px",
              letterSpacing: "0",
              textAlign: "center",
            }}
          >
            Мы предоставляем множество функций, которые вы можете <br />
            использовать. Постепенное накопление информация{" "}
          </h5>
        </div>
        <div
          className={scss.main}
          style={{
            display: "flex",
            alignItems: "start",
            marginTop: "37px",
            gap: "52px",
            marginLeft: "38px",
          }}
        >
          <img src={product.image} width={400} />
          <div className={scss.num}>
            <h1
              style={{
                fontFamily: "Rubik",
                fontWeight: "500",
                fontSize: "25px",
                lineHeight: "30px",
                letterSpacing: "0%",
              }}
            >
              {product.title}
            </h1>
            <p
              style={{
                fontFamily: "Rubik",
                fontWeight: "400",
                fontStyle: "Regular",
                fontSize: "16p",
                lineHeight: "22.86px",
                letterSpacing: "0%",
                verticalAlign: "middle",
              }}
            >
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
