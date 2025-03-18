import { Platform } from 'react-native';
import { DocsListType, NewDocumentType } from './types';
import { HttpClient } from './httpClient';

// On Android, localhost refers to the device itself, not the development machine
// For Android emulator, use 10.0.2.2 to access the dev machine's localhost
// For iOS simulator, localhost works fine
const getBaseUrl = () => {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:8080';
  }
  return 'http://localhost:8080';
};

export class DocumentService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getDocuments(signal?: AbortSignal): Promise<DocsListType[]> {
    try {
      const response = await this.httpClient.get<DocsListType[]>(`${getBaseUrl()}/documents`, {
        signal,
      });

      if (response.ok) {
        return response.data;
      } else {
        console.error(`HTTP error! Status: ${response.status}`);
        return [];
      }
    } catch (error) {
      if (signal?.aborted) {
        console.log('Request was aborted');
      } else {
        console.error('Error fetching documents:', error);
      }
      return [];
    }
  }

  async addDocument(document: NewDocumentType, signal?: AbortSignal): Promise<DocsListType[] | null> {
    try {
      const response = await this.httpClient.post<DocsListType[], NewDocumentType>(
        `${getBaseUrl()}/documents`,
        document,
        {
          signal,
        }
      );

      if (response.ok) {
        return response.data;
      } else {
        console.error(`HTTP error! Status: ${response.status}`);
        return null;
      }
    } catch (error) {
      if (signal?.aborted) {
        console.log('Request was aborted');
      } else {
        console.error('Error adding document:', error);
      }
      return null;
    }
  }
}
