export interface SessionsRepository {
  create(input: unknown): Promise<unknown>;
  findForUser(userId: string): Promise<unknown[]>;
}

