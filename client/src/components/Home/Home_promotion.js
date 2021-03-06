import React from "react";
import MyButton from "../utils/button";

const HomePromotion = (props) => {
  const promotion = {
    img: "/images/featured/featured_home_3.jpg",
    lineOne: "Up to 48% off",
    lineTwo: "In second guitars",
    linkTitle: "Shop now",
    linkTo: "/shop",
  };

  const showPromotion = () =>
    promotion ? (
      <div
        className="home_promotion_img"
        style={{
          background: `url(${promotion.img})`,
        }}
      >
        <div className="tag title">{promotion.lineOne}</div>
        <div className="tag low_title">{promotion.lineTwo}</div>
        <div>
          <MyButton
            type="default"
            title={promotion.linkTitle}
            linkTo={promotion.linkTo}
            addStyles={{
              mrgin: "10px 0 0 0",
            }}
          />
        </div>
      </div>
    ) : null;
  return <div className="home_promotion">{showPromotion()}</div>;
};

export default HomePromotion;
