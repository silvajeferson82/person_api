import { PrismaClient } from '@prisma/client';
import { beforeAll } from '@jest/globals';

let prisma: any = null

beforeAll(async () => {
  prisma = new PrismaClient();
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Test Prisma Client', () => {
  test('Connection to database', async () => {
    const result = await prisma.$queryRaw`SELECT 1 + 1`;
    expect(result[0]['?column?']).toEqual(2);
  });
});