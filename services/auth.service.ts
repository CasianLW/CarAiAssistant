import {
  authorize,
  AuthConfiguration,
  AuthorizeResult,
} from "react-native-app-auth";
import Constants from "expo-constants";

const googleConfig: AuthConfiguration = {
  clientId:
    process.env.GOOGLE_CLIENT_ID ||
    "636909529417-7lj7veih6ou17046n8gprioe86pcbh1g.apps.googleusercontent.com",
  redirectUrl: `myapp:/oauth2redirect/google`,
  //   redirectUrl: `${Constants.manifest.scheme}:/oauth2redirect/google`,
  scopes: ["openid", "profile", "email"],
  serviceConfiguration: {
    authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenEndpoint: "https://oauth2.googleapis.com/token",
    revocationEndpoint: "https://accounts.google.com/o/oauth2/revoke",
  },
};

const facebookConfig: AuthConfiguration = {
  //   clientId: Constants.manifest.extra.facebookClientId,
  clientId: "123456789",
  redirectUrl: `myapp:/oauth2redirect/facebook`,
  scopes: ["public_profile", "email"],
  serviceConfiguration: {
    authorizationEndpoint: "https://www.facebook.com/dialog/oauth",
    tokenEndpoint: "https://graph.facebook.com/v6.0/oauth/access_token",
    revocationEndpoint: "https://graph.facebook.com/me/permissions",
  },
};

export const signInWithGoogle = async (): Promise<AuthorizeResult> => {
  try {
    const result = await authorize(googleConfig);
    return result;
  } catch (error) {
    console.error("Google OAuth error:", error);
    throw error;
  }
};

export const signInWithFacebook = async (): Promise<AuthorizeResult> => {
  try {
    const result = await authorize(facebookConfig);
    return result;
  } catch (error) {
    console.error("Facebook OAuth error:", error);
    throw error;
  }
};
