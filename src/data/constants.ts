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
export const resourceGroups: { [roleName: string]: string[] } = {
  normal: ["IdVerification", "users", "settings", "help"],
  nin_verifier: ["IdVerification", "help"],
};
export const redux = {
  doLogin: "DO_LOGIN",
  doLogout: "DO_LOGOUT",
  doSearch: "DO_SEARCH",
};

export const localRoutes = {
  home: "/",
  login: "/login",
  adminLogin: "/admin",
  adminHome: "/admin/home",
  callback: "/callback",
  pending: "/pending",
  settings: "/settings",
  users: "/users",
};

const servers: any = {
  dev: {
  },
  test: {
  },
  staging: {
  },
  production: {
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
  login: authURL + "/api/test/login",
  profile: authURL + "/api/test/profile",
  register: authURL + "/api/auth/register",
  resetPass: authURL + "/reset",
  users: authURL + "/api/user",
  devPortal: devPortal,

};
