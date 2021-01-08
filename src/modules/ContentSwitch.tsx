import React, { useEffect, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { localRoutes } from "../data/constants";
import Settings from "./settings/Settings";
import NinVerification from "./ninVerification/NinVerification";
import Users from "./users/Users";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { checkUserRole } from "../utils/BOUSpecificHelpers";
import { IState } from "../data/types";

const ContentSwitch = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state: IState) => state.core.user);
  const [userRole, setUserRole]: any = useState(
    userProfile && userProfile.role,
  );
  useEffect(() => {
    /* search(remoteRoutes.gatewayMetadata, {}, (resp) => {
      dispatch(loadMetadata(resp));
    }); */
  }, [dispatch]);
  return (
    <Switch>
      {checkUserRole(userRole,"IdVerification") && (
        <Route exact={true} path="/" component={NinVerification} />
      )}
      {checkUserRole(userRole,"IdVerification") && (
        <Route path={localRoutes.ninVerification} component={NinVerification} />
      )}
      {checkUserRole(userRole,"users") && (
        <Route path={localRoutes.users} component={Users} />
      )}
      {checkUserRole(userRole,"settings") && (
        <Route path={localRoutes.settings} component={Settings} />
      )}
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
