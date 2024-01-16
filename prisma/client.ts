import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = (() => {
  let prisma: PrismaClient | null = null;

  return () => {
    if (!prisma) {
      prisma = new PrismaClient();
    }
    return prisma;
  };
})();

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  if (!globalThis.prisma) {
    globalThis.prisma = prisma;
  }
}

export default prisma;
