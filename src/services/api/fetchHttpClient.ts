import { HttpClient, HttpResponse } from "./httpClient";

export class FetchHttpClient implements HttpClient {
	async get<T>(url: string, options?: { signal?: AbortSignal }): Promise<HttpResponse<T>> {
		const response = await fetch(url, {
			method: "GET",
			signal: options?.signal,
		});

		const data = (await response.json()) as T;

		return {
			data,
			status: response.status,
			ok: response.ok,
		};
	}

	async post<T, D>(url: string, data: D, options?: { signal?: AbortSignal }): Promise<HttpResponse<T>> {
		const response = await fetch(url, {
			method: "POST",
			signal: options?.signal,
			body: JSON.stringify(data),
		});

		const responseData = (await response.json()) as T;

		return {
			data: responseData,
			status: response.status,
			ok: response.ok,
		};
	}
}
