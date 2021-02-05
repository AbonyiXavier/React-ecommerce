import React, { Component } from "react";
import { connect } from "react-redux";
import { auth } from "../actions/user_actions";
import CircularProgress from "@material-ui/core/CircularProgress";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (ComposedClass, reload, adminRoute = null) {
  class AuthenticationCheck extends Component {
    state = {
      loading: true,
    };

    componentDidMount() {
      this.props.dispatch(auth()).then((response) => {
        let user = this.props.user.userData;
        console.log("user", user);

        if (!user.email) {
          if (reload) {
            this.props.history.push("/register_login");
          }
        } else {
          if (adminRoute && !user.isAdmin) {
            this.props.history.push("/user/dashboard");
          } else {
            if (reload === false) {
              this.props.history.push("/user/dashboard");
            }
          }
        }

        this.setState({ loading: false });
      });
    }

    render() {
      if (this.state.loading) {
        return (
          <div className="main_loader">
            <CircularProgress />
          </div>
        );
      }
      //   Gotten from redux user={this.props.user}
      return <ComposedClass {...this.props} user={this.props.user} />;
    }
  }

  function mapStateToProps(state) {
    return {
      user: state.user,
    };
  }
  return connect(mapStateToProps)(AuthenticationCheck);
}
