const SuperTokens = require("supertokens-node");
const Session = require("supertokens-node/recipe/session");
const Passwordless = require("supertokens-node/recipe/passwordless");

SuperTokens.init({
  framework: "express",
  supertokens: {
    // For now using SuperTokens managed service - can be changed later
    connectionURI: "https://try.supertokens.io",
  },
  appInfo: {
    appName: "QiblaApp",
    apiDomain: process.env.API_DOMAIN || "https://qibla-api.easeapps.com",
    websiteDomain: process.env.WEBSITE_DOMAIN || "https://qibla.easeapps.com",
  },
  recipeList: [
    Passwordless.init({
      flowType: "MAGIC_LINK",
      contactMethod: "EMAIL",
    }),
    Session.init(),
  ],
});
