import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ViewSelectorProps {
  toggleView: () => void;
  viewState: 'grid' | 'list';
}
export function ViewSelector({ toggleView, viewState }: ViewSelectorProps) {
  const indicatorStyle = viewState === 'grid' ? styles.GridIndicator : styles.ListIndicator;

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={toggleView} style={styles.button}>
      <Ionicons name="list-outline" size={20} color={viewState === 'list' ? '#3e82f3' : 'black'} />
      <Ionicons name="grid-outline" size={14} color={viewState === 'grid' ? '#3e82f3' : 'black'} />
      <View style={indicatorStyle} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'relative',
    height: 32,
    width: 100,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    gap: 10,
  },
  ListIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 50,
    height: 30,
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
    backgroundColor: '#fff',
    zIndex: -1,
  },
  GridIndicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 50,
    height: 30,
    borderBottomRightRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: '#fff',
    zIndex: -1,
  },
});
