import type { User } from "../entities/brand";

export interface AuthResponse {
  token: string;
  user: User;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
<<<<<<< HEAD
=======
  brandId: string;
  branchId: string;
>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402
}

export interface LoginRequest {
  email: string;
  password: string;
}

<<<<<<< HEAD
export interface AuthMeResponse {
  user: User;
}
=======
>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402
