import React, { useEffect } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { localRoutes } from "../data/constants";
import Settings from "./settings/Settings";
import NinVerification from "./ninVerification/NinVerification";
import Users from "./users/Users";
import Layout from "../components/Layout";
import { useDispatch } from "react-redux";

const ContentSwitch = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    /* search(remoteRoutes.gatewayMetadata, {}, (resp) => {
      dispatch(loadMetadata(resp));
    }); */
  }, [dispatch]);
  return (
    <Switch>
      <Route exact={true} path="/" component={NinVerification} />
      <Route path={localRoutes.ninVerification} component={NinVerification} />
      <Route path={localRoutes.users} component={Users} />
      <Route path={localRoutes.settings} component={Settings} />
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
