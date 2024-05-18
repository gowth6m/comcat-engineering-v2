import { z } from "zod";
import prisma from "@/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
var bcrypt = require("bcryptjs");

// --------------------------------------------------------------

export const BASE_PATH = "/api/auth";

// --------------------------------------------------------------

export const LoginSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .email("Invalid email"),
    password: z.string({ required_error: "Password is required" }),
});

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
                const validatedFields = LoginSchema.safeParse(credentials);

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
        async session({ session, user }) {
            if (user) {
                session.user.id = user.id;
                session.user.firstName = user.firstName;
                session.user.lastName = user.lastName;
                session.user.email = user.email;
                session.user.isAdmin = user.isAdmin;
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
