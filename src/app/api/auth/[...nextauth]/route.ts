/* eslint-disable */
// @ts-nocheck
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    // ...add more providers here
  ],
}

const handler=NextAuth(authOptions)

// export default NextAuth(authOptions);
export { handler as GET, handler as POST }