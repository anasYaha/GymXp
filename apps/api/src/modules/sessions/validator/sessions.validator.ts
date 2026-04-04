<<<<<<< HEAD
import { z } from "zod";

export const sessionParamsSchema = z.object({
  id: z.string().trim().min(1)
});
=======
import type { CompleteSessionDto, CreateSessionDto } from "../dto/sessions.dto";

export const validateCreateSession = (input: CreateSessionDto): CreateSessionDto => input;
export const validateCompleteSession = (input: CompleteSessionDto): CompleteSessionDto => input;

>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402
