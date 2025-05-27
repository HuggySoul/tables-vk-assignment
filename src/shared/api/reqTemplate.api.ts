const BASE_URL = "http://localhost:3000";

/** Обёртка для Http запросов */
export async function ApiRequest<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${url}`, options);

  if (!response.ok) {
    const msg = await response.text();
    throw new Error(`Error ${response.status}: ${msg}`);
  }

  return await response.json();
}
