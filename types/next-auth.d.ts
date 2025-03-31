import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Extend the built-in session types
   */
  interface Session {
    user: {
      /** The user's id from the database */
      id: string
    } & DefaultSession["user"]
  }
}