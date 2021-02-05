import React from "react";
import Card from "./card";

const CardBlock = (props) => {
  const renderCards = () =>
    //   console.log(props.list.data[0].images);
    props.list
      ? props.list.data.map((card, i) => <Card key={i} {...card} />)
      : null;

  return (
    <div className="card_block">
      <div className="container">
        {props.title ? <div className="title">{props.title}</div> : null}

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {renderCards(props.list)}
        </div>
      </div>
    </div>
  );
};

export default CardBlock;
