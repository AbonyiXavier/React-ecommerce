import React, { Component } from "react";
import MyButton from "../utils/button";

class Card extends Component {
  renderCardImage(images) {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return "/images/image_not_availble.png";
    }
  }

  render() {
    const props = this.props;
    // console.log("image", props.images);
    return (
      // className={`card_item_wrapper ${props.grid}`} class toggle
      <div className={`card_item_wrapper ${props.grid}`}>
        <div
          className="image"
          style={{
            background: `url(${this.renderCardImage(props.images)}) no-repeat`,
          }}
        ></div>
        <div className="action_container">
          <div className="tags">
            <div className="brand">{props.brand.name}</div>
            <div className="name">{props.name}</div>
            <div className="name">${props.price}</div>
          </div>
        </div>
        {props.grid ? <div className="description">abcdrfet</div> : null}
        <div className="actions">
          <div className="button_wrapp">
            <MyButton
              type="default"
              altClass="card_link"
              title="View products"
              linkTo={`/product_detail/${props._id}`}
              addStyles={{
                margin: "10px 0 0 0",
              }}
            />
          </div>
          <div className="button_wrapp">
            <MyButton
              type="bag_link"
              runAction={() => {
                console.log(`${props._id} added to cart`);
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
