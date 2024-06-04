import prisma from "@/prisma";
import { loginSchema } from "@/types/validation";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
var bcrypt = require("bcryptjs");

// --------------------------------------------------------------

export const BASE_PATH = "/api/auth";

// --------------------------------------------------------------

const authOptions: NextAuthConfig = {
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const validatedFields = loginSchema.safeParse(credentials);

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;

                    const user = await prisma.user.findUnique({
                        where: { email },
                    });

                    if (!user || !user.password) {
                        return null;
                    }

                    const isValidPassword = bcrypt.compareSync(
                        password,
                        user.password
                    );

                    if (isValidPassword) {
                        return {
                            id: user.id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            isAdmin: user.isAdmin,
                        };
                    }
                }

                return null;
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
    basePath: BASE_PATH,
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string;
                session.user.firstName = token.firstName as string;
                session.user.lastName = token.lastName as string;
                session.user.email = token.email as string;
                session.user.isAdmin = token.isAdmin as boolean;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.firstName = user.firstName;
                token.lastName = user.lastName;
                token.email = user.email;
                token.isAdmin = user.isAdmin;
            }
            return token;
        },
    },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
