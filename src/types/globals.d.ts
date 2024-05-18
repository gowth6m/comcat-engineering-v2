import { PrismaClient, User } from '@prisma/client';
import NextAuth, { type DefaultSession } from "next-auth"

declare global {
    namespace NodeJS {
        interface Global {
            prisma?: PrismaClient;
        }
    }

    // Extending the globalThis object for browser compatibility
    var prisma: PrismaClient | undefined;
}


declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            isAdmin: boolean;
        } & DefaultSession["user"]
    }
    interface JWT {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        isAdmin: boolean;
    }
    interface User {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        isAdmin: boolean;
    }
}

export const { auth, handlers } = NextAuth({
    callbacks: {
        session({ session, token, user }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    address: user.address,
                },
            }
        },
    },
})