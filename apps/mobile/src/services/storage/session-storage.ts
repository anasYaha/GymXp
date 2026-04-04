let storedToken: string | null = null;

export const sessionStorage = {
  saveToken: async (token: string) => {
    storedToken = token;
  },
  getToken: async () => storedToken,
  clearToken: async () => {
    storedToken = null;
  }
};

