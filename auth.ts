import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import authConfig from "@/auth.config"

// Only use PrismaAdapter in non-edge environments
const adapter = process.env.NEXT_RUNTIME === 'edge' 
  ? undefined 
  : PrismaAdapter(prisma)

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter,
  session: {
    strategy: "jwt",
  },
  callbacks:{
    session({token, session}){
      if(session.user && token.sub){
        session.user.id = token.sub
        
        // Include image, name and email from token if available
        if (token.picture) {
          session.user.image = token.picture
        }
        if (token.name) {
          session.user.name = token.name
        }
        if (token.email) {
          session.user.email = token.email
        }
      }
      return session
    },
    async jwt({ token, user, account, profile }) {
      // Keep the user id in the token
      if (user) {
        token.sub = user.id
      }
      
      // Add profile data to token when signing in
      if (account && profile && account.provider === "google") {
        token.picture = profile.picture
        token.name = profile.name
        token.email = profile.email
      }
      
      return token
    }
  },
  ...authConfig,
})

// Separate server-side auth functions
export const getServerAuthSession = auth
