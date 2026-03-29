export interface RegisterDto {
  fullName: string;
  email: string;
  password: string;
  brandId: string;
  branchId: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

