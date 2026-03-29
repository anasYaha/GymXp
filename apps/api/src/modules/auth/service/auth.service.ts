export class AuthService {
  register(): Promise<never> {
    return Promise.reject(new Error("TODO: implement member registration"));
  }

  login(): Promise<never> {
    return Promise.reject(new Error("TODO: implement login"));
  }

  getMe(): Promise<never> {
    return Promise.reject(new Error("TODO: implement auth/me"));
  }
}

