import React from "react";
import MyButton from "../utils/button";
import Login from "./login";

const RegisterLogin = () => {
  return (
    <div className="page_container">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <h1>New Customers</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              vitae libero magna. Ut venenatis ante felis, ac porttitor dolor
              sollicitudin ut. Nullam lobortis mollis leo luctus dignissim.
              Donec imperdiet ipsum sed turpis vehicula, at ultrices quam porta.
            </p>
            <MyButton
              type="default"
              title="Create an account"
              linkTo="/register"
              addStyles={{
                margin: "10px 0 0 0",
              }}
            />
          </div>
          <div className="right">
            <h2>Registered Customers</h2>
            <p>If you have an account please log in</p>
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterLogin;
