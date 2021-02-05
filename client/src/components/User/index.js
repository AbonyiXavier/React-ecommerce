import React from "react";
import UserLayout from "../../hoc/user";
import MyButton from "../utils/button";

const UserDashboard = ({ user }) => {
  return (
    <div>
      <UserLayout>
        <div>
          <div className="user_nfo_panel">
            <h1>User Information</h1>
            <div>
              <span>{user.userData.firstName}</span>
              <span>{user.userData.lastName}</span>
              <span>{user.userData.email}</span>
            </div>
            <MyButton
              type="default"
              title="Edit account info"
              linkTo="/user/user_profile"
            />
          </div>
          <div className="user_nfo_panel">
            <h1>History Purchases</h1>
            <div className="user_product_block_wrapper">History</div>
          </div>
        </div>
      </UserLayout>
    </div>
  );
};

export default UserDashboard;
