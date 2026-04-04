<<<<<<< HEAD
import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  password: z.string().min(8).max(72),
  brandId: z.string().trim().min(1).optional()
});

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8).max(72)
});
=======
import type { LoginDto, RegisterDto } from "../dto/auth.dto";

export const validateRegisterDto = (input: RegisterDto): RegisterDto => input;
export const validateLoginDto = (input: LoginDto): LoginDto => input;

>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402
