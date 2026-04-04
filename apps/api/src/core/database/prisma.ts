<<<<<<< HEAD
import prismaClientPackage from "@prisma/client";

type PrismaClientType = InstanceType<(typeof prismaClientPackage)["PrismaClient"]>;

const { PrismaClient } = prismaClientPackage;

declare global {
  // eslint-disable-next-line no-var
  var __gymxpPrisma: PrismaClientType | undefined;
}

export const prisma =
  globalThis.__gymxpPrisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "warn", "error"] : ["error"]
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.__gymxpPrisma = prisma;
}
=======
export const prisma = {
  status: "TODO",
  message: "Initialize PrismaClient here once dependencies are installed."
} as const;

>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402
