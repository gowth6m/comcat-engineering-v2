import { PrismaClient } from '@prisma/client';

declare global {
    namespace NodeJS {
        interface Global {
            prisma?: PrismaClient;
        }
    }

    // Extending the globalThis object for browser compatibility
    var prisma: PrismaClient | undefined;
}
