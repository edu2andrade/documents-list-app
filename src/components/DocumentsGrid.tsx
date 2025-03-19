import { ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { DocsListType } from '@/services';
import { CardGrid } from '@/components/CardGrid';

interface DocumentsGridProps {
  documents: DocsListType[];
  onRefresh: () => void;
  refreshing: boolean;
}

export function DocumentsGrid({ documents, onRefresh, refreshing }: DocumentsGridProps) {
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
