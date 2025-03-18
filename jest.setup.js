// Mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => {
  const { View, Text } = require('react-native');
  return {
    Ionicons: ({ name, size, color }) => {
      return (
        <View testID={`icon-${name}`}>
          <Text style={{ display: 'none' }}>{`size:${size},color:${color}`}</Text>
        </View>
      );
    },
    MaterialIcons: ({ name, size, color }) => {
      return (
        <View testID={`material-icon-${name}`}>
          <Text style={{ display: 'none' }}>{`size:${size},color:${color}`}</Text>
        </View>
      );
    },
    FontAwesome: ({ name, size, color }) => {
      return (
        <View testID={`fa-icon-${name}`}>
          <Text style={{ display: 'none' }}>{`size:${size},color:${color}`}</Text>
        </View>
      );
    },
  };
});
