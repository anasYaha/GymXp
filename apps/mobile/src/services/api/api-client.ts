import { authStore } from "../../features/auth/auth.store";

const buildUrl = (path: string) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${apiClient.baseUrl}${normalizedPath}`;
};

const parseErrorMessage = async (response: Response) => {
  try {
    const body = (await response.json()) as {
      error?: {
        message?: string;
      };
    };

    return body.error?.message?.trim() || `API request failed with ${response.status}`;
  } catch {
    return `API request failed with ${response.status}`;
  }
};

const request = async <T>(
  path: string,
  init?: RequestInit
): Promise<T> => {
  const headers = new Headers(init?.headers);

  headers.set("Content-Type", "application/json");

  if (authStore.token) {
    headers.set("Authorization", `Bearer ${authStore.token}`);
  }

  const response = await fetch(buildUrl(path), {
    ...init,
    headers
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  return (await response.json()) as T;
};

export const apiClient = {
  baseUrl: process.env.EXPO_PUBLIC_API_BASE_URL?.trim() ?? "http://localhost:4000",
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, {
      method: "POST",
      body: JSON.stringify(body)
    }),
  patch: <T>(path: string, body: unknown) =>
    request<T>(path, {
      method: "PATCH",
      body: JSON.stringify(body)
    })
};
