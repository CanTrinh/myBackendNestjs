// prisma/seed.ts
import { PrismaClient } from '../src/generated/client'
const prisma = new PrismaClient();

async function main() {
  const roles = ['ADMIN', 'MOD', 'USER', 'GUEST'];
  for (const role_name of roles) {
    await prisma.role.upsert(
     {
      where: {
        role_name
      },
      update: {},
      create: { 
        role_name
       },
    });
  }
}

main().finally(async () => {
  await prisma.$disconnect();
});
