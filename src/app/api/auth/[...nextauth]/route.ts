import { userController } from '@/controller/userController';
import { IUser } from '@/models/UserModel';
import NextAuth, { NextAuthOptions, Session, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// Define your session callback interface
interface SessionWithUser extends Session {
  user: IUser & { id?: string }; // Extend IUser to include optional id property
}

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    signIn: async ({ user }) => {
      if (!user) return false;

      const existingUser = await userController.getUserByEmail(user.email as string);

      if (!existingUser) {
        await userController.createUser({
          email: user.email,
          name: user.name,
          image: user.image,
        });
      } else {
        await userController.updateUser(existingUser._id as string, {
          name: user.name,
          image: user.image,
        });
      }

      return true;
    },
    session: async ({ session, token }) => {
      if (!token?.email) return session;

      const dbUser = await userController.getUserByEmail(token.email as string);
      if (dbUser) {
        (session as SessionWithUser).user = { ...session.user, id: dbUser._id };
      }

      return session as SessionWithUser;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as POST, handler as GET };
