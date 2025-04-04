import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import mongoose from "mongoose";

// interface Credentials {
//   identifier: string;
//   password: string;
// }

interface AuthUser extends User {
  _id: string;
  isVerified: boolean;
  username: string;
  isAcceptingMessages: boolean;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        identifier: {
          label: "Email or Username",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"identifier" | "password", string> | undefined
      ): Promise<AuthUser | null> {
        if (!credentials) {
          throw new Error("Missing credentials");
        }

        await dbConnect();

        try {
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });

          if (!user) {
            throw new Error("No user found with this email");
          }

          if (!user.isVerified) {
            throw new Error("Please verify your account before login");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordCorrect) {
            throw new Error("Incorrect Password");
          }

          const userObject = user.toObject() as User & {
            _id: mongoose.Types.ObjectId;
          };

          return {
            _id: userObject._id.toString() ?? "",
            isVerified: userObject.isVerified,
            username: userObject.username,
            isAcceptingMessages: userObject.isAcceptingMessages ?? false,
          } as AuthUser;
        } catch (err) {
          if (err instanceof Error) {
            throw new Error(err.message);
          }
          throw new Error("An unknown error occurred");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.username = user.username;
        token.isAcceptingMessages = user.isAcceptingMessages;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        session.user.username = token.username;
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
