import bcrypt from "bcryptjs";
import { UserRole } from "@prisma/client";

import { prisma } from "../../src/core/database/prisma";

const demoPassword = "demo12345";

const addHours = (date: Date, hours: number) => {
  const nextDate = new Date(date);
  nextDate.setHours(nextDate.getHours() + hours);
  return nextDate;
};

const addDays = (date: Date, days: number) => {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
};

const seed = async () => {
  const passwordHash = await bcrypt.hash(demoPassword, 10);
  const now = new Date();

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

  const sessionOptions = [
    {
      id: "session_tunis_strength",
      branchId: "branch_tunis",
      title: "Strength Foundations",
      description: "A simple guided full-body strength block for members checking in after work.",
      coachName: "Coach Amir",
      startsAt: addHours(now, 2),
      durationMins: 60,
      muscleGroup: "Full Body"
    },
    {
      id: "session_tunis_legs",
      branchId: "branch_tunis",
      title: "Leg Day Express",
      description: "Quick lower-body session with machines and squat rack stations.",
      coachName: "Coach Yasmine",
      startsAt: addHours(now, 5),
      durationMins: 45,
      muscleGroup: "Legs"
    },
    {
      id: "session_tunis_hiit",
      branchId: "branch_tunis",
      title: "Morning HIIT",
      description: "High-energy conditioning block for the Tunis branch morning crowd.",
      coachName: "Coach Mehdi",
      startsAt: addDays(addHours(now, 25), 0),
      durationMins: 35,
      muscleGroup: "Cardio"
    },
    {
      id: "session_sousse_back",
      branchId: "branch_sousse",
      title: "Back & Core Builder",
      description: "Technique-first back and core session designed for regular members.",
      coachName: "Coach Lina",
      startsAt: addHours(now, 3),
      durationMins: 50,
      muscleGroup: "Back"
    },
    {
      id: "session_sousse_boxfit",
      branchId: "branch_sousse",
      title: "BoxFit Circuit",
      description: "Circuit-based cardio and boxing combinations for the Sousse branch.",
      coachName: "Coach Rami",
      startsAt: addHours(now, 6),
      durationMins: 40,
      muscleGroup: "Cardio"
    }
  ];

  for (const option of sessionOptions) {
    await prisma.branchSessionOption.upsert({
      where: {
        id: option.id
      },
      update: option,
      create: option
    });
  }
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
