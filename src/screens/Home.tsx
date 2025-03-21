import { useState, useMemo, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '@/components/AppHeader';
import { DocumentsList } from '@/components/DocumentsList';
import { DocumentsGrid } from '@/components/DocumentsGrid';
import { ViewSelector } from '@/components/ViewSelector';
import { SortDropdown, SortOption } from '@/components/SortDropdown';
import { DocumentService, FetchHttpClient, DocsListType } from '@/services';
import { AppFooter } from '@/components/AppFooter';
// import { WebSocketLogger } from "@/components/WebSocketLogger";
import { useNotifications } from '@/contexts/NotificationsContext';
import { useToast } from '@/contexts/ToastContext';

export function Home() {
  const [viewState, setViewState] = useState<'grid' | 'list'>('list');
  const [docsList, setDocsList] = useState<DocsListType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState<SortOption>({
    label: 'Created (Newest first)',
    value: 'createdAt_desc',
  });

  const { addNotification, notifications } = useNotifications();
  const { showToast } = useToast();

  const toggleView = () => {
    setViewState((prev) => (prev === 'grid' ? 'list' : 'grid'));
  };

  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
  };

  // Using the document service with dependency injection
  const fetchDocuments = async (signal?: AbortSignal) => {
    try {
      setIsLoading(true);
      const httpClient = new FetchHttpClient();
      const documentService = new DocumentService(httpClient);
      const documents = await documentService.getDocuments(signal);

      if (!signal?.aborted) {
        setDocsList(documents);
      }
    } catch (error) {
      if (!signal?.aborted) console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    fetchDocuments(signal);
    return () => abortController.abort();
  }, []);

  const sortedDocuments = useMemo(() => {
    const docs = [...docsList];

    if (sortOption.value === 'createdAt_asc') {
      return docs.sort((a, b) => {
        return new Date(a.CreatedAt).getTime() - new Date(b.CreatedAt).getTime();
      });
    } else if (sortOption.value === 'createdAt_desc') {
      return docs.sort((a, b) => {
        return new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime();
      });
    }

    return docs;
  }, [sortOption, docsList]);

  const documentView = useMemo(() => {
    if (sortedDocuments.length === 0) {
      return <Text style={styles.noDocuments}>No documents available</Text>;
    }

    return viewState === 'grid' ? (
      <DocumentsGrid documents={sortedDocuments} onRefresh={fetchDocuments} refreshing={isLoading} />
    ) : (
      <DocumentsList documents={sortedDocuments} onRefresh={fetchDocuments} refreshing={isLoading} />
    );
  }, [viewState, sortedDocuments]);

  const handleAddDocument = async (name: string, version: string) => {
    try {
      const httpClient = new FetchHttpClient();
      const documentService = new DocumentService(httpClient);
      const newDocument = {
        Title: name,
        Version: version,
      };
      const addedDocument = await documentService.addDocument(newDocument);
      if (addedDocument) {
        setDocsList(addedDocument); // This isn't returning the added document, but an entire new list...
      }
      // Add notification to the notification context
      addNotification({ title: name, version });
      showToast({
        title: 'Success',
        description: 'Document added successfully',
        type: 'success',
        duration: 2000,
      });
    } catch (error) {
      console.error('Error adding document:', error);
      showToast({
        title: 'Error',
        description: 'Failed to add document',
        type: 'error',
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    console.log('Notifications context:', notifications);
  }, [notifications]);

  return (
    <View style={styles.container}>
      <AppHeader />
      {/* <WebSocketLogger /> */}
      <View style={styles.content}>
        <View style={styles.controlsRow}>
          <SortDropdown onSortChange={handleSortChange} currentSort={sortOption} />
          <ViewSelector toggleView={toggleView} viewState={viewState} />
        </View>
        {isLoading ? <ActivityIndicator size="large" color="#3e82f3" /> : documentView}
      </View>
      <AppFooter onPress={handleAddDocument} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingBottom: 30,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 20,
    backgroundColor: '#f6f6f6',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 6,
  },
  noDocuments: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});
