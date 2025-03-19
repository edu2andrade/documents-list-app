import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { DocsListType } from '@/services';
import { CardList } from '@/components/CardList';

interface DocumentsListProps {
  documents: DocsListType[];
  onRefresh: () => void;
  refreshing: boolean;
}

export function DocumentsList({ documents, onRefresh, refreshing }: DocumentsListProps) {
  const Items = ({ item }: { item: DocsListType }) => (
    <View style={styles.items}>
      <CardList document={item} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={documents}
        keyExtractor={(item) => item.ID}
        renderItem={Items}
        style={styles.flatlist}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  items: {
    marginVertical: 6,
  },
  flatlist: {
    paddingHorizontal: 6,
  },
});
