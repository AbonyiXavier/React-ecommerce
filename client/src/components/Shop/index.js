import React, { Component } from "react";
import PageTop from "../utils/page_top";
import { connect } from "react-redux";
import { getBrands, getWoods } from "../../actions/product_actions";

import { frets } from "../utils/Form/frets_data";

import CollapseCheckbox from "../utils/collapseCheckbox";

class Shop extends Component {
  state = {
    grid: "",
    limit: 6,
    skip: 0,
    filters: {
      brand: [],
      frets: [],
      wood: [],
      price: [],
    },
  };

  componentDidMount() {
    this.props.dispatch(getBrands());
    this.props.dispatch(getWoods());
  }

  handleFilters = (filters, category) => {
    // console.log("filters", filters);

    const newFilters = { ...this.state.filters };
    newFilters[category] = filters;

    this.setState({
      filters: newFilters,
    });
  };

  render() {
    console.log(this.state.filters);
    const products = this.props.products;
    console.log("product", products);
    console.log("product 1", products.getBrands.brand);
    return (
      <div>
        <PageTop title="Browse Products" />
        <div className="container">
          <div className="shop_wrapper">
            <div className="left">
              <CollapseCheckbox
                initState={true}
                title="Brands"
                list={products.getBrands.brand}
                handleFilters={(filters) =>
                  this.handleFilters(filters, "brand")
                }
              />
              <CollapseCheckbox
                initState={false}
                title="frets"
                list={frets}
                handleFilters={(filters) =>
                  this.handleFilters(filters, "frets")
                }
              />
              <CollapseCheckbox
                initState={false}
                title="Woods"
                list={products.getWoods.wood}
                handleFilters={(filters) => this.handleFilters(filters, "wood")}
              />
            </div>
            <div className="right">Right</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};
export default connect(mapStateToProps)(Shop);
