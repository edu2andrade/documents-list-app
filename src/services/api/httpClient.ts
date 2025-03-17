export interface HttpResponse<T> {
	data: T;
	status: number;
	ok: boolean;
}

export interface HttpClient {
	get<T>(url: string, options?: { signal?: AbortSignal }): Promise<HttpResponse<T>>;
}
