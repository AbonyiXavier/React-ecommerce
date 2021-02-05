import React, { Component } from "react";
import FormField from "../utils/Form/formfield";
import { update, generateData, isFormValid } from "../utils/Form/formActions";
import Dialog from "@material-ui/core/Dialog";
import SweetAlert from "react-bootstrap-sweetalert";

import { connect } from "react-redux";
import { registerUser } from "../../actions/user_actions";

class Register extends Component {
  state = {
    formError: false,
    formSuccess: false,
    alert: null,
    formdata: {
      firstName: {
        element: "input",
        value: "",
        config: {
          name: "firstName_input",
          type: "text",
          placeholder: "Enter your first name",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
      lastName: {
        element: "input",
        value: "",
        config: {
          name: "lastName_input",
          type: "text",
          placeholder: "Enter your last name",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
      email: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
          type: "email",
          placeholder: "Enter your email",
        },
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
      password: {
        element: "input",
        value: "",
        config: {
          name: "password_input",
          type: "password",
          placeholder: "Enter your password",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
      confirmPassword: {
        element: "input",
        value: "",
        config: {
          name: "confirmPassword_input",
          type: "password",
          placeholder: "Enter your confirm password",
        },
        validation: {
          required: true,
          confirm: "password",
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
    },
  };
  showMessage() {
    const getAlert = () => (
      <SweetAlert success onConfirm={() => this.hideAlert()}>
        <div>Congratulations !!</div>
        <div>You will be redirected to the LOGIN in a couple of seconds...</div>
      </SweetAlert>
    );

    this.setState({
      alert: getAlert(),
    });
  }

  hideAlert() {
    this.setState({
      alert: null,
    });
  }

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, "register");
    this.setState({
      formError: false,
      formdata: newFormdata,
    });
  };

  submitForm = (e) => {
    e.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, "register");
    let formIsValid = isFormValid(this.state.formdata, "register");
    if (formIsValid) {
      // console log user loginn details on console
      // console.log(dataToSubmit);
      this.props
        .dispatch(registerUser(dataToSubmit))
        .then((response) => {
          // response from server
          if (response) {
            // console.log(response);
            this.setState({
              formError: false,
              formSuccess: true,
            });
            setTimeout(() => {
              this.props.history.push("/register_login");
            }, 3000);
          } else {
            this.setState({
              formError: true,
            });
          }
        })
        .catch((e) => {
          this.setState({
            formError: true,
          });
        });
    } else {
      this.setState({
        formError: true,
      });
    }
  };

  render() {
    return (
      <div className="page_wrapper">
        <div className="container">
          <div className="register_login_container">
            <div className="left">
              <form onSubmit={(e) => this.submitForm(e)}>
                <h2>Personal information</h2>
                <div className="form_block_two">
                  <div className="block">
                    <FormField
                      id={"firstName"}
                      formdata={this.state.formdata.firstName}
                      change={(element) => this.updateForm(element)}
                    />
                  </div>
                  <div className="block">
                    <FormField
                      id={"lastName"}
                      formdata={this.state.formdata.lastName}
                      change={(element) => this.updateForm(element)}
                    />
                  </div>
                </div>
                <div>
                  <FormField
                    id={"email"}
                    formdata={this.state.formdata.email}
                    change={(element) => this.updateForm(element)}
                  />
                </div>
                <h2>Verify password</h2>
                <div className="form_block_two">
                  <div className="block">
                    <FormField
                      id={"password"}
                      formdata={this.state.formdata.password}
                      change={(element) => this.updateForm(element)}
                    />
                  </div>
                  <div className="block">
                    <FormField
                      id={"confirmPassword"}
                      formdata={this.state.formdata.confirmPassword}
                      change={(element) => this.updateForm(element)}
                    />
                  </div>
                </div>
                {this.state.formError ? (
                  <div className="error_label">Please check your data</div>
                ) : null}
                {/* For SweetAlert */}
                {/* <button onClick={(e) => this.showMessage()}>
                  CREATE AN ACCOUNT
                </button>
                {this.state.alert} */}
                {/* For Dialog alert  */}
                <button onClick={(e) => this.submitForm(e)}>
                  CREATE AN ACCOUNT
                </button>
              </form>
            </div>
          </div>
        </div>
        <Dialog open={this.state.formSuccess}>
          <div className="dialog_alert">
            <div>Congratulations !!</div>
            <div>
              You will be redirected to the LOGIN in a couple of seconds...
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default connect()(Register);
