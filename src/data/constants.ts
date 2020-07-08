export const AUTH_TOKEN_KEY = "__demo__dfcu__token";
export const AUTH_USER_KEY = "__demo__dfcu__user";

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
  participantsDetails: "/participants/:participantId/:currentView",
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
    Nin: "https://bou-niv-api-test.test001.laboremus.no",
    Gateway: "https://bou-niv-gatewayservice-test.test001.laboremus.no",
    // Kyc: "https://kyc-connector-staging.onboarding.dfcugroup.com",
    // Notification: "https://emata-poc-smsservice-test.laboremus.no",
    // Payments: "https://emata-poc-payments-test.laboremus.no",
  },
  test: {
    Auth: "https://bou-auth-api-test.proxy001.laboremus.no",
    Crm: "https://crmservice-test.laboremus.no",
    Case: "https://bou-niv-workflow-api-test.test001.laboremus.no",
    Nin: "https://bou-niv-api-test.test001.laboremus.no",
    Gateway: "https://bou-niv-gatewayservice-test.test001.laboremus.no",
    // Kyc: "https://dfcu-customeronboarding-kycconnector-test.laboremus.no",
    // Notification: "https://notificationservice-test.laboremus.no",
    // Log: "https://dfcu-customeronboarding-logging-test.laboremus.no",
  },
  sit: {
    Auth: "https://bou-auth-api-test.proxy001.laboremus.no",
    Crm: "https://crmservice-test.laboremus.no",
    Case: "https://bou-niv-workflow-api-test.test001.laboremus.no",
    Nin: "https://bou-niv-api-test.test001.laboremus.no",
    Gateway: "https://bou-niv-gatewayservice-test.test001.laboremus.no",
    // Kyc: "https://kyc-connector-test.onboarding.dfcugroup.com",
    // Notification: "https://notification-test.onboarding.dfcugroup.com",
    // Accounts: "https://finacle-connector-test.onboarding.dfcugroup.com",
    // Log: "https://logging-test.onboarding.dfcugroup.com",
  },
  uat: {
    Auth: "https://authentication-staging.onboarding.dfcugroup.com",
    Crm: "https://crm-staging.onboarding.dfcugroup.com",
    Case: "https://casehandling-staging.onboarding.dfcugroup.com",
    Nin: "https://bou-niv-api-staging.laboremus.no",
    Gateway: "https://bou-niv-gatewayservice-staging.laboremus.no",
    // Kyc: "https://kyc-connector-staging.onboarding.dfcugroup.com",
    // Notification: "https://notification-staging.onboarding.dfcugroup.com",
    // Accounts: "https://finacle-connector-staging.onboarding.dfcugroup.com",
    // Log: "https://logging-staging.onboarding.dfcugroup.com",
  },
  production: {
    Auth: "https://authentication.onboarding.dfcugroup.com",
    Crm: "https://crm.onboarding.dfcugroup.com",
    Case: "https://casehandling.onboarding.dfcugroup.com",
    Nin: "https://bou-niv-api.laboremus.no",
    Gateway: "https://bou-niv-gatewayservice.laboremus.no",
    // Kyc: "https://kyc-connector.onboarding.dfcugroup.com",
    // Notification: "https://notification.onboarding.dfcugroup.com",
    // Accounts: "https://finacle-connector.onboarding.dfcugroup.com",
    // Log: "https://logging.onboarding.dfcugroup.com",
  },
};

const evVar = process.env.REACT_APP_ENV || "dev";
const environment = evVar.trim();
console.log(`############# Env : ${environment} ###############`);
const env = servers[environment];
const authURL = env.Auth;
const crmURL = env.Crm;
const caseHandlingURL = env.Case;
const NinVerificationURL = env.Nin;
const gatewayURL = env.Gateway;
const kycURL = env.Kyc;
const notificationURL = env.Notification;

export const remoteRoutes = {
  contactPersons: crmURL + "/api/participants/contact",
  subscriptions: gatewayURL + "/billing/api/subscriptions",
  participants: gatewayURL + "/crm/api/contact",
  participantsContactPersons: gatewayURL + "/crm/api/v3.0/contact",
  billing: gatewayURL + "/billing/api/bills",
  ninVerificationRequests: gatewayURL + "/niv/api/request/search",
  ninVerification: NinVerificationURL + "/api/national-id/verify",
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
