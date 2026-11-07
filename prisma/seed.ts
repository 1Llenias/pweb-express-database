import 'dotenv/config';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '../src/generated/prisma/client.js';

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? 'file:./dev.db'
});
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.product.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, name: 'Buku', price: 15000 }
  });

  await prisma.product.upsert({
    where: { id: 2 },
    update: {},
    create: { id: 2, name: 'Pulpen', price: 5000 }
  });

  console.log('Seed selesai');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());