import React, { useEffect } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { localRoutes, remoteRoutes } from "../data/constants";
import Dashboard from "./dashboard/Dashboard";
import Contacts from "./contacts/list/Contacts";
import ContactDetails from "./contacts/details/Details";
import ApplicationDetails from "./ninVerification/details/Details";
import Settings from "./settings/Settings";
import NinVerification from "./ninVerification/NinVerification";
import ParticipantsDetails from "./participants/details/Details";
import Participants from "./participants/Participants";
import Billing from "./billing/Billing";
import Subscriptions from "./subscriptions/Subscriptions";
import Reports from "./reports/Reports";
import DeveloperPortal from "./developer_portal/DeveloperPortal";
import Users from "./settings/users/List";
import User from "./users/User";
import UserDetails from "./settings/users/Details";
import Layout from "../components/Layout";
import { useDispatch } from "react-redux";
import { loadMetadata } from "../data/redux/coreActions";
import { search } from "../utils/ajax";

const ContentSwitch = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    search(remoteRoutes.gatewayMetadata, {}, (resp) => {
      dispatch(loadMetadata(resp));
    });
  }, [dispatch]);
  return (
    <Switch>
      <Route exact={true} path="/" component={NinVerification} />
      <Route path={localRoutes.dashboard} component={Dashboard} />
      <Route
        path={localRoutes.applicationsDetails}
        component={ApplicationDetails}
      />
      <Route path={localRoutes.ninVerification} component={NinVerification} />
      <Route
        path={localRoutes.participantsDetails}
        component={ParticipantsDetails}
      />
      <Route path={localRoutes.participants} component={Participants} />
      <Route path={localRoutes.billing} component={Billing} />
      <Route path={localRoutes.subscriptions} component={Subscriptions} />
      <Route path={localRoutes.reports} component={Reports} />
      <Route path={localRoutes.users} component={User} />
      <Route path={localRoutes.developerPortal} component={DeveloperPortal} />
      <Route path={localRoutes.contactsDetails} component={ContactDetails} />
      <Route path={localRoutes.contacts} component={Contacts} />
      <Route path={localRoutes.settings} component={Settings} />
      <Route path={localRoutes.usersDetails} component={UserDetails} />
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
