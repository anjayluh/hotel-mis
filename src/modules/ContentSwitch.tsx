import React, { useEffect, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { localRoutes } from "../data/constants";
import Settings from "./settings/Settings";
import Home from "./home/Home";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { checkUserRole } from "../utils/BOUSpecificHelpers";
import { IState } from "../data/types";
import { profile } from "console";



const ContentSwitch = () => {
  const dispatch = useDispatch();
  const userProfile: any = useState({ name: "Peter Ocheng", role: "Admin" });
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
      <Route path={localRoutes.home} component={Home} />
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
