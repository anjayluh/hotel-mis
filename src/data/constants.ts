export const AUTH_TOKEN_KEY = "__bou__backoffice__token";
export const AUTH_USER_KEY = "__bou__backoffice__user";

export const systemRoles = {
  contacts: {
    view: "contacts_view",
    edit: "contacts_edit",
    chc: "contacts_chc",
    teams: "contacts_teams",
  },
};

export const redux = {
  doLogin: "DO_LOGIN",
  doLogout: "DO_LOGOUT",
  doSearch: "DO_SEARCH",
};

export const localRoutes = {
  callback: "/callback",
  pending: "/pending",
  ninVerification: "/verification",
  participantsDetails: "/participants/:participantId/:subSection",
  participants: "/participants",
  billing: "/billing",
  subscriptions: "/subscriptions",
  reports: "/reports",
  devPortal: "/developer-portal",
  applicationsDetails: "/applications/:caseId",
  dashboard: "/dashboard",
  contacts: "/contacts",
  contactsDetails: "/contacts/:contactId",
  settings: "/settings",
  users: "/users",
  usersDetails: "/users/:userId",
};

const servers: any = {
  dev: {
    Auth: "https://bou-auth-api-test.test001.laboremus.no",
    Nin: "https://bou-niv-api-test.test001.laboremus.no",
    devPortal: "https://bou-niv-api-test.test001.laboremus.no",
  },
  test: {
    Auth: "https://bou-auth-api-test.test001.laboremus.no",
    Nin: "https://bou-niv-api-test.test001.laboremus.no",
    devPortal: "https://bou-niv-api-test.test001.laboremus.no",
  },
  sit: {
    Auth: "https://bou-auth-api-test.proxy001.laboremus.no",
    Nin: "https://bou-niv-api-test.test001.laboremus.no",
    devPortal: "https://bou-niv-api-test.test001.laboremus.no",
  },
  prideUat: {
    Auth: "https://bou-auth-api-staging.proxy001.laboremus.no",
    Nin: "https://niv-api-uat.pride.co.ug",
    devPortal: "https://niv-api-uat.pride.co.ug",
  },
  eximUat: {
    Auth: "https://bou-auth-api-staging.proxy001.laboremus.no",
    Nin: "https://niv-api-uat.eximbank-ug.com",
    devPortal: "https://niv-api-uat.eximbank-ug.com",
  },
  staging: {
    Auth: "https://bou-auth-api-test.test001.laboremus.no",
    Nin: "https://bou-niv-api-staging.test001.laboremus.no",
    devPortal: "https://bou-niv-api-staging.test001.laboremus.no/",
  },
  production: {
    Gateway: "https://bou-niv-gatewayservice.laboremus.no",
  },
};

const evVar = process.env.REACT_APP_ENV || "dev";
const environment = evVar.trim();
console.log(`############# Env : ${environment} ###############`);
const env = servers[environment];
const authURL = env.Auth;
const devPortal = env.devPortal;
const NinVerificationURL = env.Nin;

export const remoteRoutes = {
  ninVerificationId: NinVerificationURL + "/api/request",
  ninVerificationRequests: NinVerificationURL + "/api/request/search",
  ninVerification: NinVerificationURL + "/api/national-id/verify",
  authServer: authURL,
  login: authURL + "/api/test/login",
  profile: authURL + "/api/test/profile",
  register: authURL + "/api/auth/register",
  resetPass: authURL + "/reset",
  users: authURL + "/api/user",
  devPortal: devPortal,
  niraNotification: NinVerificationURL + "/health",
};
