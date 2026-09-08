import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';
import { validateEnvironment } from './env';

// Fail fast if environment variables do not meet production security criteria
validateEnvironment();

function getResolvedDatabaseUrl(): string | undefined {
  const envUrl = process.env.DATABASE_URL;
  if (!envUrl || envUrl === 'file:./dev.db' || envUrl.startsWith('file:.')) {
    const prismaDb = path.resolve(process.cwd(), 'prisma', 'dev.db');
    const rootDb = path.resolve(process.cwd(), 'dev.db');
    if (fs.existsSync(prismaDb)) {
      return `file:${prismaDb}`;
    } else if (fs.existsSync(rootDb)) {
      return `file:${rootDb}`;
    } else {
      return `file:${prismaDb}`;
    }
  }
  return envUrl;
}

const resolvedDbUrl = getResolvedDatabaseUrl();
if (resolvedDbUrl) {
  process.env.DATABASE_URL = resolvedDbUrl;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: resolvedDbUrl ? { db: { url: resolvedDbUrl } } : undefined,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
