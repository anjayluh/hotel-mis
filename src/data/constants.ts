import { FIs } from "./financialInsititutions";

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
export const availableRoles = [
  "participant_super_user", "nin_verifier"
]
export const resourceGroups:{[roleName:string]:string[]}  = {
  participant_super_user: ["IdVerification", "users", "settings"],
  nin_verifier: ["IdVerification"],
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
    clientId: "laboremus-backoffice:portal",
    envScope: "openid profile roles offline_access laboremus_BNVS_API",
  },
  test: {
    Auth: "https://bou-auth-api-test.test001.laboremus.no",
    Nin: "https://bou-niv-api-test.test001.laboremus.no",
    devPortal: "https://bou-niv-api-test.test001.laboremus.no",
    clientId: "laboremus-backoffice:portal",
    envScope: "openid profile roles offline_access laboremus_BNVS_API"
  },
  staging: {
    Auth: "https://bou-auth-api-staging.proxy001.laboremus.no",
    Crm: "https://crm-api-test.bou.or.ug",
    Nin: "https://bou-niv-api-staging.test001.laboremus.no",
    devPortal: "https://bou-niv-api-staging.test001.laboremus.no/",
    clientId: "laboremus-backoffice:portal",
    envScope: "openid profile roles offline_access laboremus_BNVS_API"
  },
  sit: {
    Auth: "https://bou-auth-api-test.proxy001.laboremus.no",
    Nin: "https://bou-niv-api-test.test001.laboremus.no",
    devPortal: "https://bou-niv-api-test.test001.laboremus.no",
    clientId: "laboremus-backoffice:portal",
    envScope: "backoffice:portal"
  },
  capitalTest: {
    Auth: "https://bou-auth-api-test.test001.laboremus.no",
    Nin: "https://capitalbank-niv-api-test.test001.laboremus.no",
    devPortal: "https://capitalbank-niv-api-test.test001.laboremus.no",
    clientId: "capitalbank-backoffice:portal",
    envScope: "openid profile roles offline_access capitalbank_BNVS_API"
  },
  capitalStaging: {
    Auth: "https://bou-auth-api-staging.proxy001.laboremus.no",
    Nin: "https://capitalbank-niv-api-staging.test001.laboremus.no",
    devPortal: "https://capitalbank-niv-api-test.test001.laboremus.no",
    clientId: "capitalbank-backoffice:portal",
    envScope: "openid profile roles offline_access capitalbank_BNVS_API"
  },
  stateTest: {
    Auth: "https://bou-auth-api-test.test001.laboremus.no",
    Nin: "https://statebank-niv-api-test.test001.laboremus.no",
    devPortal: "https://statebank-niv-api-test.test001.laboremus.no",
    clientId: "statebank-backoffice:portal",
    envScope: "openid profile roles offline_access statebank_BNVS_API"
  },
  stateStaging: {
    Auth: "https://bou-auth-api-staging.proxy001.laboremus.no",
    Nin: "https://statebank-niv-api-staging.test001.laboremus.no",
    devPortal: "https://statebank-niv-api-test.test001.laboremus.no",
    clientId: "statebank-backoffice:portal",
    envScope: "openid profile roles offline_access statebank_BNVS_API"
  },
  prideUat: {
    Auth: "https://auth-api-test.bou.or.ug",
    Nin: "https://niv-api-uat.pride.co.ug",
    devPortal: "https://niv-api-uat.pride.co.ug",
    clientId: "pride-backoffice:portal",
    envScope: "openid profile roles offline_access pride_BNVS_API"
  },
  eximUat: {
    Auth: "https://auth-api-test.bou.or.ug",
    Nin: "https://niv-api-uat.eximbank-ug.com",
    devPortal: "https://niv-api-uat.eximbank-ug.com",
    clientId: "exim-backoffice:portal",
    envScope: "openid profile roles offline_access exim_BNVS_API"
  },
  stanbicUat: {
    Auth: "https://auth-api-test.bou.or.ug",
    Nin: "https://nivapiuat.ug.sbicdirectory.com",
    devPortal: "https://nivapiuat.ug.sbicdirectory.com",
    clientId: "stanbic-backoffice:portal",
    envScope: "openid profile roles offline_access stanbic_BNVS_API"
  },
  housingUat: {
    Auth: "https://auth-api-test.bou.or.ug",
    Nin: "https://niv-api-uat.housingfinance.com",
    devPortal: "https://niv-api-uat.housingfinance.com",
    clientId: "housingfinance-backoffice:portal",
    envScope: "openid profile roles offline_access housingfinance_BNVS_API"
  },
  fincaUat: {
    Auth: "https://auth-api-test.bou.or.ug",
    Nin: "https://niv-api-uat.finca.com",
    devPortal: "https://niv-api-uat.finca.com",
    clientId: "finca-backoffice:portal",
    envScope: "openid profile roles offline_access finca_BNVS_API"
  },
  ecoUat: {
    Auth: "https://auth-api-test.bou.or.ug",
    Nin: "https://niv-portal-uat.ecobank.com",
    devPortal: "https://niv-portal-uat.ecobank.com",
    clientId: "eco-backoffice:portal",
    envScope: "openid profile roles offline_access eco_BNVS_API"
  },
  dfcuUat: {
    Auth: "https://niv-auth-api-uat.dfcugroup.com",
    Nin: "https://niv-api-uat.dfcugroup.com",
    devPortal: "https://niv-api-uat.dfcugroup.com",
    clientId: "dfcu-backoffice:portal",
    envScope: "openid profile roles offline_access dfcu_BNVS_API"
  },
  yakoUat: {
    Auth: "https://auth-api-test.bou.or.ug",
    Nin: "https://niv-api-uat.yako.com",
    devPortal: "https://niv-api-uat.yako.com",
    clientId: "yako-backoffice:portal",
    envScope: "openid profile roles offline_access yako_BNVS_API"
  },
  bouUat: {
    Auth: "https://auth-api-test.bou.or.ug",
    Nin: "https://niv-api-test.bou.or.ug",
    devPortal: "https://niv-api-test.bou.or.ug",
    clientId: "backoffice:portal",
    envScope: "openid profile roles offline_access bou_BNVS_API"
  },
  production: {
    Gateway: "https://bou-niv-gatewayservice.laboremus.no",
    clientId: "bou:backoffice",
    envScope: "backoffice:portal"
  },
  fallBack: {
    Auth: "https://bou-auth-api-test.test001.laboremus.no",
    Nin: "https://bou-niv-api-test.test001.laboremus.no",
    devPortal: "https://bou-niv-api-test.test001.laboremus.no",
    envScope: "backoffice:portal"
  },
};

const evVar = process.env.REACT_APP_ENV || "dev";
const environment = evVar.trim();
console.log(`############# Env : ${environment} ###############`);
export const env = servers[environment];

const authURL = env.Auth;
const devPortal = env.devPortal;
const NinVerificationURL = env.Nin;

export const remoteRoutes = {
  ninRequests: NinVerificationURL + "/api/requests",
  niraNotification: NinVerificationURL + "/health",
  niraExport: NinVerificationURL + "/api/exports/",
  niraCredentials: NinVerificationURL + "/api/credentials",
  niraCurrentCredentials: NinVerificationURL + "/api/credentials/current",
  authServer: authURL,
  login: authURL + "/api/test/login",
  profile: authURL + "/api/test/profile",
  register: authURL + "/api/auth/register",
  resetPass: authURL + "/reset",
  users: authURL + "/api/user",
  devPortal: devPortal,
};
