import { userController } from '@/controller/userController';
import { IUser } from '@/models/UserModel';
import NextAuth, { NextAuthOptions, Session, User, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// Define your session callback interface
interface SessionWithUser extends  Session {
  user: IUser & User; // Extend IUser to include optional id property
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
      console.log('session callback called');
      console.log('session:', session);
      console.log('token:', token);

      if (!token?.email) return session;

      console.log('looking for user with email:', token.email);
      const dbUser = await userController.getUserByEmail(token.email as string);
      console.log('db user:', dbUser);

      if (dbUser) {
        (session ).user = { ...session.user};
      }

      console.log('session after callback:', session as SessionWithUser);
      return session as SessionWithUser;
    },

  },
};

const handler = NextAuth(authOptions);
export { handler as POST, handler as GET };
