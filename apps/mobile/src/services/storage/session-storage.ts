import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "gymxp.token";
const USER_KEY = "gymxp.user";

export const sessionStorage = {
  saveToken(token: string) {
    return AsyncStorage.setItem(TOKEN_KEY, token);
  },

  getToken() {
    return AsyncStorage.getItem(TOKEN_KEY);
  },

  async saveUser(user: unknown) {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  async getUser<T>() {
    const raw = await AsyncStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as T) : null;
  },

  clear() {
    return AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
  }
};
