import { FetchHttpClient } from '@/services/api/fetchHttpClient';

// Mock global fetch
global.fetch = jest.fn();

describe('FetchHttpClient', () => {
  let fetchHttpClient: FetchHttpClient;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    fetchHttpClient = new FetchHttpClient();
  });

  describe('get', () => {
    test('should make a GET request and return the response data', async () => {
      const mockData = { id: '1', name: 'Test' };
      const mockResponse = {
        json: jest.fn().mockResolvedValue(mockData),
        status: 200,
        ok: true,
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await fetchHttpClient.get<typeof mockData>('https://api.example.com/data');

      expect(global.fetch).toHaveBeenCalledWith('https://api.example.com/data', {
        method: 'GET',
        signal: undefined,
      });
      expect(result).toEqual({
        data: mockData,
        status: 200,
        ok: true,
      });
    });

    test('should pass the abort signal to fetch when provided', async () => {
      const mockData = { id: '1', name: 'Test' };
      const mockResponse = {
        json: jest.fn().mockResolvedValue(mockData),
        status: 200,
        ok: true,
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
      const abortController = new AbortController();

      await fetchHttpClient.get<typeof mockData>('https://api.example.com/data', {
        signal: abortController.signal,
      });

      expect(global.fetch).toHaveBeenCalledWith('https://api.example.com/data', {
        method: 'GET',
        signal: abortController.signal,
      });
    });

    test('should handle error responses correctly', async () => {
      const mockData = { error: 'Not found' };
      const mockResponse = {
        json: jest.fn().mockResolvedValue(mockData),
        status: 404,
        ok: false,
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await fetchHttpClient.get<typeof mockData>('https://api.example.com/data');

      expect(result).toEqual({
        data: mockData,
        status: 404,
        ok: false,
      });
    });

    test('should throw when fetch rejects', async () => {
      const networkError = new Error('Network error');
      (global.fetch as jest.Mock).mockRejectedValue(networkError);

      await expect(fetchHttpClient.get('https://api.example.com/data')).rejects.toThrow('Network error');
    });
  });

  describe('post', () => {
    test('should make a POST request with the provided data', async () => {
      const requestData = { name: 'New Item' };
      const responseData = { id: '1', name: 'New Item' };
      const mockResponse = {
        json: jest.fn().mockResolvedValue(responseData),
        status: 201,
        ok: true,
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await fetchHttpClient.post<typeof responseData, typeof requestData>(
        'https://api.example.com/data',
        requestData
      );

      expect(global.fetch).toHaveBeenCalledWith('https://api.example.com/data', {
        method: 'POST',
        signal: undefined,
        body: JSON.stringify(requestData),
      });
      expect(result).toEqual({
        data: responseData,
        status: 201,
        ok: true,
      });
    });

    test('should pass the abort signal to fetch when provided', async () => {
      const requestData = { name: 'New Item' };
      const responseData = { id: '1', name: 'New Item' };
      const mockResponse = {
        json: jest.fn().mockResolvedValue(responseData),
        status: 201,
        ok: true,
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
      const abortController = new AbortController();

      await fetchHttpClient.post<typeof responseData, typeof requestData>('https://api.example.com/data', requestData, {
        signal: abortController.signal,
      });

      expect(global.fetch).toHaveBeenCalledWith('https://api.example.com/data', {
        method: 'POST',
        signal: abortController.signal,
        body: JSON.stringify(requestData),
      });
    });

    test('should handle error responses correctly', async () => {
      const requestData = { name: 'Invalid Item' };
      const responseData = { error: 'Validation failed' };
      const mockResponse = {
        json: jest.fn().mockResolvedValue(responseData),
        status: 400,
        ok: false,
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await fetchHttpClient.post<typeof responseData, typeof requestData>(
        'https://api.example.com/data',
        requestData
      );

      expect(result).toEqual({
        data: responseData,
        status: 400,
        ok: false,
      });
    });

    test('should throw when fetch rejects', async () => {
      const requestData = { name: 'New Item' };
      const networkError = new Error('Network error');
      (global.fetch as jest.Mock).mockRejectedValue(networkError);

      await expect(fetchHttpClient.post('https://api.example.com/data', requestData)).rejects.toThrow('Network error');
    });
  });
});
