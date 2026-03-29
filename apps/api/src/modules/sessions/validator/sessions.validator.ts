import type { CompleteSessionDto, CreateSessionDto } from "../dto/sessions.dto";

export const validateCreateSession = (input: CreateSessionDto): CreateSessionDto => input;
export const validateCompleteSession = (input: CompleteSessionDto): CompleteSessionDto => input;

