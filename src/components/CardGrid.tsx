import { Text, View, StyleSheet } from 'react-native';
import { DocsListType } from '@/services';

export const CardGrid = ({ document }: { document: DocsListType }) => {
  return (
    <View style={styles.cardGrid}>
      <Text style={styles.h1}>{document.Title}</Text>
      <Text style={styles.detail}>{`Version ${document.Version}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardGrid: {
    padding: 16,
    gap: 4,
    width: '48%',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  h1: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 12,
    color: '#666',
  },
});
