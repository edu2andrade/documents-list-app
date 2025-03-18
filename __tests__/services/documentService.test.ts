import { Platform } from 'react-native';
import { DocumentService } from '@/services/api/documentService';
import { HttpClient, HttpResponse } from '@/services/api/httpClient';
import { DocsListType, NewDocumentType } from '@/services/api/types';

// Mock the Platform module
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'ios',
  select: jest.fn(),
}));

// Sample data for tests
const mockDocuments: DocsListType[] = [
  {
    ID: '1',
    Title: 'Document 1',
    Version: '1.0',
    CreatedAt: '2023-01-01T00:00:00Z',
    UpdatedAt: '2023-01-01T00:00:00Z',
    Attachments: [],
    Contributors: [{ ID: 'user1', Name: 'User One' }],
  },
  {
    ID: '2',
    Title: 'Document 2',
    Version: '1.0',
    CreatedAt: '2023-01-02T00:00:00Z',
    UpdatedAt: '2023-01-02T00:00:00Z',
    Attachments: ['attachment1.pdf'],
    Contributors: [{ ID: 'user2', Name: 'User Two' }],
  },
];

// Create a mock HttpClient
const createMockHttpClient = () => {
  const mockHttpClient: jest.Mocked<HttpClient> = {
    get: jest.fn(),
    post: jest.fn(),
  };
  return mockHttpClient;
};

describe('DocumentService', () => {
  let mockHttpClient: jest.Mocked<HttpClient>;
  let documentService: DocumentService;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    mockHttpClient = createMockHttpClient();
    documentService = new DocumentService(mockHttpClient);

    // Spy on console methods to prevent actual logging during tests
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore console methods
    jest.restoreAllMocks();
  });

  describe('getDocuments', () => {
    test('should return documents when API call is successful', async () => {
      // Arrange
      const successResponse: HttpResponse<DocsListType[]> = {
        data: mockDocuments,
        status: 200,
        ok: true,
      };
      mockHttpClient.get.mockResolvedValue(successResponse);

      // Act
      const result = await documentService.getDocuments();

      // Assert
      expect(mockHttpClient.get).toHaveBeenCalledWith('http://localhost:8080/documents', { signal: undefined });
      expect(result).toEqual(mockDocuments);
    });

    test('should return empty array when API call fails with error status', async () => {
      // Arrange
      const errorResponse: HttpResponse<DocsListType[]> = {
        data: [],
        status: 500,
        ok: false,
      };
      mockHttpClient.get.mockResolvedValue(errorResponse);

      // Act
      const result = await documentService.getDocuments();

      // Assert
      expect(mockHttpClient.get).toHaveBeenCalledWith('http://localhost:8080/documents', { signal: undefined });
      expect(result).toEqual([]);
      expect(console.error).toHaveBeenCalled();
    });

    test('should return empty array when API call throws an error', async () => {
      // Arrange
      mockHttpClient.get.mockRejectedValue(new Error('Network error'));

      // Act
      const result = await documentService.getDocuments();

      // Assert
      expect(mockHttpClient.get).toHaveBeenCalledWith('http://localhost:8080/documents', { signal: undefined });
      expect(result).toEqual([]);
      expect(console.error).toHaveBeenCalled();
    });

    test('should handle aborted requests', async () => {
      // Arrange
      const abortController = new AbortController();
      const abortError = new DOMException('The operation was aborted', 'AbortError');
      mockHttpClient.get.mockRejectedValue(abortError);

      // Abort the request
      abortController.abort();

      // Act
      const result = await documentService.getDocuments(abortController.signal);

      // Assert
      expect(mockHttpClient.get).toHaveBeenCalledWith('http://localhost:8080/documents', {
        signal: abortController.signal,
      });
      expect(result).toEqual([]);
      expect(console.log).toHaveBeenCalledWith('Request was aborted');
    });

    test('should use correct URL for Android platform', async () => {
      // Arrange
      // Change the platform to Android
      Platform.OS = 'android';

      const successResponse: HttpResponse<DocsListType[]> = {
        data: mockDocuments,
        status: 200,
        ok: true,
      };
      mockHttpClient.get.mockResolvedValue(successResponse);

      // Act
      const result = await documentService.getDocuments();

      // Assert
      expect(mockHttpClient.get).toHaveBeenCalledWith('http://10.0.2.2:8080/documents', { signal: undefined });
      expect(result).toEqual(mockDocuments);

      // Reset platform back to iOS for other tests
      Platform.OS = 'ios';
    });
  });

  describe('addDocument', () => {
    const newDocument: NewDocumentType = {
      Title: 'New Document',
      Version: '1.0',
    };

    test('should return updated documents when API call is successful', async () => {
      // Arrange
      const updatedDocuments = [
        ...mockDocuments,
        {
          ...newDocument,
          ID: '3',
          CreatedAt: '2023-01-03T00:00:00Z',
          UpdatedAt: '2023-01-03T00:00:00Z',
          Attachments: [],
          Contributors: [{ ID: 'user1', Name: 'User One' }],
        },
      ];

      const successResponse: HttpResponse<DocsListType[]> = {
        data: updatedDocuments,
        status: 201,
        ok: true,
      };
      mockHttpClient.post.mockResolvedValue(successResponse);

      // Act
      const result = await documentService.addDocument(newDocument);

      // Assert
      expect(mockHttpClient.post).toHaveBeenCalledWith('http://localhost:8080/documents', newDocument, {
        signal: undefined,
      });
      expect(result).toEqual(updatedDocuments);
    });

    test('should return null when API call fails with error status', async () => {
      // Arrange
      const errorResponse: HttpResponse<DocsListType[]> = {
        data: [],
        status: 500,
        ok: false,
      };
      mockHttpClient.post.mockResolvedValue(errorResponse);

      // Act
      const result = await documentService.addDocument(newDocument);

      // Assert
      expect(mockHttpClient.post).toHaveBeenCalledWith('http://localhost:8080/documents', newDocument, {
        signal: undefined,
      });
      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalled();
    });

    test('should return null when API call throws an error', async () => {
      // Arrange
      mockHttpClient.post.mockRejectedValue(new Error('Network error'));

      // Act
      const result = await documentService.addDocument(newDocument);

      // Assert
      expect(mockHttpClient.post).toHaveBeenCalledWith('http://localhost:8080/documents', newDocument, {
        signal: undefined,
      });
      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalled();
    });

    test('should handle aborted requests', async () => {
      // Arrange
      const abortController = new AbortController();
      const abortError = new DOMException('The operation was aborted', 'AbortError');
      mockHttpClient.post.mockRejectedValue(abortError);

      // Abort the request
      abortController.abort();

      // Act
      const result = await documentService.addDocument(newDocument, abortController.signal);

      // Assert
      expect(mockHttpClient.post).toHaveBeenCalledWith('http://localhost:8080/documents', newDocument, {
        signal: abortController.signal,
      });
      expect(result).toBeNull();
      expect(console.log).toHaveBeenCalledWith('Request was aborted');
    });

    test('should use correct URL for Android platform', async () => {
      // Arrange
      // Change the platform to Android
      Platform.OS = 'android';

      const updatedDocuments = [
        ...mockDocuments,
        {
          ...newDocument,
          ID: '3',
          CreatedAt: '2023-01-03T00:00:00Z',
          UpdatedAt: '2023-01-03T00:00:00Z',
          Attachments: [],
          Contributors: [{ ID: 'user1', Name: 'User One' }],
        },
      ];

      const successResponse: HttpResponse<DocsListType[]> = {
        data: updatedDocuments,
        status: 201,
        ok: true,
      };
      mockHttpClient.post.mockResolvedValue(successResponse);

      // Act
      const result = await documentService.addDocument(newDocument);

      // Assert
      expect(mockHttpClient.post).toHaveBeenCalledWith('http://10.0.2.2:8080/documents', newDocument, {
        signal: undefined,
      });
      expect(result).toEqual(updatedDocuments);

      // Reset platform back to iOS for other tests
      Platform.OS = 'ios';
    });
  });
});
