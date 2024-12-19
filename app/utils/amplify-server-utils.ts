import { NextServer, createServerRunner } from "@aws-amplify/adapter-nextjs";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth/server";

import { Amplify, type ResourcesConfig } from "aws-amplify";

const authConfig: ResourcesConfig["Auth"] = {
  Cognito: {
    userPoolId: String(process.env.NEXT_PUBLIC_USER_POOL_ID),
    userPoolClientId: String(process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID),
  },
};

Amplify.configure(
  {
    Auth: authConfig,
  },
  { ssr: true }
);

export const { runWithAmplifyServerContext } = createServerRunner({
  config: {
    Auth: authConfig,
  },
});

export async function authenticatedUser(context: NextServer.Context) {
  return await runWithAmplifyServerContext({
    nextServerContext: context,
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec);
        if (!session.tokens) {
          return;
        }
        const user = {
          ...(await getCurrentUser(contextSpec)),
          isAdmin: false,
        };
        const groups = session.tokens.accessToken.payload["cognito:groups"];

        console.log("user: ", user);
        // @ts-ignore
        user.isAdmin = Boolean(groups && groups.includes("Admins"));

        return user;
      } catch (error) {
        console.log(error);
      }
    },
  });
}