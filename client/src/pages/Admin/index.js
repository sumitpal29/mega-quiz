import React, { useEffect } from "react";
import { Tabs, message } from "antd";
import _get from "lodash/get";

import AdminForm from "../../components/forms/AdminForm";
// context
import { useAdminContext } from "../../contexts/AdminContext";
import { useGameContext } from "../../contexts/GameContext";
// styles
import { adminContainer } from "./admin.module.scss";

const { TabPane } = Tabs;

function Admin({ history }) {
  const { adminLogIn, isAdminLoggedIn, adminSignUp } = useAdminContext();
  const { onAdminOnBoard } = useGameContext();

  useEffect(() => {
    if (isAdminLoggedIn) {
      history.push("/admin-dasboard");
    }
  }, [history, isAdminLoggedIn]);

  const handleUserLogin = async (userdata) => {
    adminLogIn(
      userdata,
      (d) => {
        message.info(`${_get(d, "username")} - login successful.`);
        onAdminOnBoard(_get(d, "games", []));
        history.push("/admin-dasboard");
      },
      (err) => message.error(err)
    );
  };

  const handleUserSignUp = async (userdata) => {
    adminSignUp(userdata, (d) => message.info(_get(d, "message")));
  };

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Log In" key="1">
        <div className={adminContainer}>
          <AdminForm
            submitButtonLabel="Admin Login"
            header="Login"
            onSubmit={handleUserLogin}
          />
        </div>
      </TabPane>
      <TabPane tab="Sign Up" key="2">
        <div className={adminContainer}>
          <AdminForm
            submitButtonLabel="Admin SignUp"
            header="Sign Up"
            onSubmit={handleUserSignUp}
          />
        </div>
      </TabPane>
    </Tabs>
  );
}

export default Admin;
