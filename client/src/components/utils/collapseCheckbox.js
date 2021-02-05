import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Collapse from "@material-ui/core/Collapse";

class CollapseCheckbox extends Component {
  state = {
    open: false,
    checked: [],
  };

  componentDidMount() {
    if (this.props.initState) {
      this.setState({
        open: this.props.initState,
      });
    }
  }

  handleClick = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  //handle the toggle of the faAngleUp and faAngleDown
  handleAngleIcon = () =>
    this.state.open ? (
      <FontAwesomeIcon icon={faAngleUp} className="icon" />
    ) : (
      <FontAwesomeIcon icon={faAngleDown} className="icon" />
    );

  // showing each category name products
  renderList = () =>
    // console.log("francis", this.props.list);
    this.props.list
      ? this.props.list.map((value) => (
          <ListItem key={value._id} style={{ padding: "10px 0" }}>
            <ListItemText primary={value.name} />
            <ListItemSecondaryAction>
              <Checkbox
                color="primary"
                onChange={this.handleCheckBoxToggle(value._id)}
                checked={this.state.checked.indexOf(value._id) !== -1}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))
      : null;

  handleCheckBoxToggle = (value) => () => {
    const { checked } = this.state;

    const currentIndex = checked.indexOf(value);

    const newChecked = [...checked];
    //if checkbox is not on the list, it will add by pushing
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    console.log(newChecked);

    this.setState(
      {
        checked: newChecked,
      },
      () => {
        this.props.handleFilters(newChecked);
      }
    );
  };

  render() {
    return (
      <div className="collapse_items_wrapper">
        <List style={{ borderBottom: "1px solid #dbdbdb" }}>
          <ListItem
            onClick={this.handleClick}
            style={{ padding: "10px 23px 10px 0" }}
          >
            <ListItemText
              primary={this.props.title}
              className="collapse_title"
            />
            {this.handleAngleIcon()}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {this.renderList()}
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

export default CollapseCheckbox;
