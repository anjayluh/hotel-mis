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
  ninVerification: "/ninVerification",
  participantsDetails: "/participants/:participantId/:subSection",
  participants: "/participants",
  billing: "/billing",
  subscriptions: "/subscriptions",
  reports: "/reports",
  developerPortal: "/developer-portal",
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
    Crm: "https://crmservice-test.laboremus.no",
    Case: "https://bou-niv-workflow-api-test.test001.laboremus.no",
    Gateway: "https://bou-niv-gatewayservice-test.test001.laboremus.no",
    devPortal: "https://bou-niv-api-test.laboremus.no",
  },
  test: {
    Auth: "https://bou-auth-api-test.test001.laboremus.no",
    Crm: "https://bou-niv-crmservice-test.test001.laboremus.no",
    Case: "https://bou-niv-workflow-api-test.test001.laboremus.no",
    Gateway: "https://bou-niv-gatewayservice-test.test001.laboremus.no",
    devPortal: "https://bou-niv-api-test.laboremus.no",
  },
  sit: {
    Auth: "https://bou-auth-api-test.proxy001.laboremus.no",
    Crm: "https://crmservice-test.laboremus.no",
    Case: "https://bou-niv-workflow-api-test.test001.laboremus.no",
    Nin: "https://bou-niv-api-test.test001.laboremus.no",
    Gateway: "https://bou-niv-gatewayservice-test.test001.laboremus.no",
    devPortal: "https://bou-niv-api-test.laboremus.no",
  },
  uat: {
    Auth: "https://bou-auth-api-test.test001.laboremus.no",
    Crm: "https://bou-niv-crmservice-staging.test001.laboremus.no",
    Gateway: "https://bou-niv-gatewayservice-staging.test001.laboremus.no",
    devPortal: "https://bou-niv-api-test.laboremus.no",
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
const crmURL = env.Crm;
const caseHandlingURL = env.Case;
const gatewayURL = env.Gateway;
const kycURL = env.Kyc;
const notificationURL = env.Notification;

export const remoteRoutes = {
  contactPersons: crmURL + "/api/participants/contact",
  subscriptions: gatewayURL + "/billing/api/subscriptions",
  participants: gatewayURL + "/crm/api/contact",
  participantsContactPersons: gatewayURL + "/crm/api/v3.0/contact",
  billing: gatewayURL + "/billing/api/bills",
  ninVerificationId: gatewayURL + "/niv/api/request",
  ninVerificationRequests: gatewayURL + "/niv/api/request/search",
  ninVerification: gatewayURL + "/niv/api/national-id/verify",
  billingCycle: gatewayURL + "/billing/api/billing-cycles",
  serviceCategory: gatewayURL + "/service-category",
  authServer: authURL,
  gatewayUpload: gatewayURL + "/files",
  login: authURL + "/api/test/login",
  profile: authURL + "/api/test/profile",
  register: authURL + "/api/auth/register",
  resetPass: authURL + "/reset",
  contacts: crmURL + "/api/contact",
  contactSearch: crmURL + "/api/contact/search",
  contactById: crmURL + "/api/contact/id",
  contactsPerson: crmURL + "/api/person",
  contactsChc: crmURL + "/api/person/chc",
  contactsEmail: crmURL + "/api/email",
  contactsTag: crmURL + "/api/tag",
  contactsUrl: crmURL + "/api/url",
  contactsPhone: crmURL + "/api/phone",
  contactsAddress: crmURL + "/api/address",
  contactsIdentification: crmURL + "/api/identification",
  workflows: caseHandlingURL + "/api/workflows",
  workflowsCombo: caseHandlingURL + "/api/queries/combo",
  documentsDownload: caseHandlingURL + "/api/documents/download",
  workflowsManual: caseHandlingURL + "/api/manual",
  samplePdf: caseHandlingURL + "/sample.pdf",
  gatewayMetadata: gatewayURL + "/niv/api/request",
  users: authURL + "/api/user",
};
