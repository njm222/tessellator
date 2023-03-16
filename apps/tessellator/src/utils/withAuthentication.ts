import { NextPageContext } from "next";

export function withAuthentication(fn: (context: NextPageContext) => Promise<any>) {
    return async (context: NextPageContext) => {
        const { access_token, refresh_token } = context.query;

        if (access_token && refresh_token) {
            context.res?.setHeader("Set-Cookie", [
                `accessToken=${access_token}; path=/; samesite=strict; Max-Age=1800`,
                `refreshToken=${refresh_token}; path=/; samesite=strict;`,
            ]);
        }

        return await fn(context);
    }
}