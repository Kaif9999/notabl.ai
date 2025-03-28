import NextAuth, { AuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import prisma from "@/lib/prisma"

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }: { session: any, user: any }) {
      // Add user ID to the session
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
    async signIn({ profile }: { profile: any }) {
      try {
        // Check if user exists
        const userExists = await prisma.user.findUnique({
          where: {
            email: profile.email,
          },
        });

        // If not, create user
        if (!userExists) {
          await prisma.user.create({
            data: {
              email: profile.email,
              name: profile.name,
              image: profile.image,
            },
          });
        }
        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error);
        return false;
      }
    },
  },
  pages: {
    signIn: '/login',  // Custom login page path
  },
  session: {
    strategy: "jwt" as const,
  },
};

const handler = NextAuth(authOptions as AuthOptions);
export { handler as GET, handler as POST };