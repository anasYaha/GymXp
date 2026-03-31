type ApiErrorPayload = {
  error?: {
    code?: string;
    message?: string;
  };
};

const env = globalThis as typeof globalThis & {
  process?: {
    env?: Record<string, string | undefined>;
  };
};

const isApiErrorPayload = (payload: unknown): payload is ApiErrorPayload => {
  return typeof payload === "object" && payload !== null && "error" in payload;
};

export const apiClient = {
  baseUrl: env.process?.env?.EXPO_PUBLIC_API_BASE_URL ?? "http://192.168.1.244:4000",

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

    const payload = (await response.json().catch(() => null)) as T | ApiErrorPayload | null;

    if (!response.ok) {
      const message = isApiErrorPayload(payload) && payload.error?.message ? payload.error.message : "Request failed.";

      throw new Error(message);
    }

    return payload as T;
  }
};
