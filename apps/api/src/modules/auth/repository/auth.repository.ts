export interface AuthRepository {
  findUserByEmail(email: string): Promise<unknown>;
  createUser(input: unknown): Promise<unknown>;
}

