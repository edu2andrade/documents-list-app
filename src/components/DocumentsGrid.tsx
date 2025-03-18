import { useState } from 'react';
import { ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { DocsListType } from '@/services';
import { CardGrid } from '@/components/CardGrid';

interface DocumentsGridProps {
  documents: DocsListType[];
}

export function DocumentsGrid({ documents }: DocumentsGridProps) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      // TODO: Fetch new data
      // Set Skip / Limit
      console.log('Refreshed');
      setRefreshing(false);
    }, 2000);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      {documents.map((document) => (
        <CardGrid key={document.ID} document={document} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
  },
  scrollView: {
    padding: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
});
