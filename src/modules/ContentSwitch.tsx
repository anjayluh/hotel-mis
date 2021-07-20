import React, { useEffect, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { localRoutes } from "../data/constants";
import Settings from "./settings/Settings";
import Home from "./home/Home";
import AdminHome from "./admin/Home";
import Login from "./login/Login";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { checkUserRole } from "../utils/BOUSpecificHelpers";
import { IState } from "../data/types";
import { profile } from "console";



const ContentSwitch = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state: IState) => state.core.user);
  const [userRole, setUserRole]: any = useState(
    userProfile && userProfile.role,
  );
  useEffect(() => {
  }, [dispatch]);
  return (
    <Switch>
      {checkUserRole(userRole, "settings") && (
        <Route path={localRoutes.settings} component={Settings} />
      )}
      <Route path={localRoutes.login} component={Login} />
      <Route path={localRoutes.adminLogin} component={Login} exact />
      <Route path={localRoutes.home} component={Home} />
      <Route path={localRoutes.adminHome} component={AdminHome} exact />
      <Route component={NoMatch} />
    </Switch>
  );
};

const NoMatch = () => (
  <Layout>
    <h2>Oops nothing here!!</h2>
    <Link to="/">Take me home</Link>
  </Layout>
);

export default ContentSwitch;
