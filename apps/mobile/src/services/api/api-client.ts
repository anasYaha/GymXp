export const apiClient = {
  baseUrl: process.env.EXPO_PUBLIC_API_BASE_URL ?? "http://localhost:4000",

  async request<T>(path: string, init?: RequestInit & { token?: string | null }): Promise<T> {
    const headers = new Headers(init?.headers);
    headers.set("Content-Type", "application/json");

    if (init?.token) {
      headers.set("Authorization", `Bearer ${init.token}`);
    }

    const response = await fetch(`${apiClient.baseUrl}${path}`, {
      ...init,
      headers
    });

    const payload = (await response.json().catch(() => null)) as
      | T
      | { error?: { code?: string; message?: string } }
      | null;

    if (!response.ok) {
      const message =
        payload && "error" in payload && payload.error?.message
          ? payload.error.message
          : "Request failed.";

      throw new Error(message);
    }

    return payload as T;
  }
};
