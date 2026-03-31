import bcrypt from "bcryptjs";
import { UserRole } from "@prisma/client";

import { prisma } from "../../src/core/database/prisma";

const demoPassword = "demo12345";

const seed = async () => {
  const passwordHash = await bcrypt.hash(demoPassword, 10);

  await prisma.gymBrand.upsert({
    where: {
      id: "brand_gym_city"
    },
    update: {
      name: "Gym City"
    },
    create: {
      id: "brand_gym_city",
      name: "Gym City"
    }
  });

  await prisma.gymBranch.upsert({
    where: {
      id: "branch_tunis"
    },
    update: {
      brandId: "brand_gym_city",
      name: "Gym City Tunis",
      city: "Tunis",
      address: "Avenue Habib Bourguiba"
    },
    create: {
      id: "branch_tunis",
      brandId: "brand_gym_city",
      name: "Gym City Tunis",
      city: "Tunis",
      address: "Avenue Habib Bourguiba"
    }
  });

  await prisma.gymBranch.upsert({
    where: {
      id: "branch_sousse"
    },
    update: {
      brandId: "brand_gym_city",
      name: "Gym City Sousse",
      city: "Sousse",
      address: "Boulevard du 14 Janvier"
    },
    create: {
      id: "branch_sousse",
      brandId: "brand_gym_city",
      name: "Gym City Sousse",
      city: "Sousse",
      address: "Boulevard du 14 Janvier"
    }
  });

  await prisma.user.upsert({
    where: {
      email: "ali@example.com"
    },
    update: {
      fullName: "Ali Ben Salah",
      passwordHash,
      brandId: "brand_gym_city",
      currentBranchId: "branch_tunis",
      role: UserRole.MEMBER
    },
    create: {
      id: "u_1",
      fullName: "Ali Ben Salah",
      email: "ali@example.com",
      passwordHash,
      brandId: "brand_gym_city",
      currentBranchId: "branch_tunis",
      role: UserRole.MEMBER
    }
  });

  await prisma.user.upsert({
    where: {
      email: "sara@example.com"
    },
    update: {
      fullName: "Sara Trabelsi",
      passwordHash,
      brandId: "brand_gym_city",
      currentBranchId: "branch_sousse",
      role: UserRole.MEMBER
    },
    create: {
      id: "u_2",
      fullName: "Sara Trabelsi",
      email: "sara@example.com",
      passwordHash,
      brandId: "brand_gym_city",
      currentBranchId: "branch_sousse",
      role: UserRole.MEMBER
    }
  });
};

seed()
  .then(async () => {
    await prisma.$disconnect();
    console.log("GymXP seed completed.");
  })
  .catch(async (error) => {
    console.error("GymXP seed failed.", error);
    await prisma.$disconnect();
    process.exit(1);
  });
