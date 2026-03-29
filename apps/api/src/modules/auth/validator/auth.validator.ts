import type { LoginDto, RegisterDto } from "../dto/auth.dto";

export const validateRegisterDto = (input: RegisterDto): RegisterDto => input;
export const validateLoginDto = (input: LoginDto): LoginDto => input;

