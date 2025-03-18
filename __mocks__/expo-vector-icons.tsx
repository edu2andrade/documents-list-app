import React from 'react';
import { View, Text } from 'react-native';

// Mock implementation for Ionicons
export const Ionicons = ({ name, size, color }: { name: string; size: number; color: string }) => {
  // Store size and color as data attributes that we can test against
  return (
    <View testID={`icon-${name}`}>
      <Text style={{ display: 'none' }}>{`size:${size},color:${color}`}</Text>
    </View>
  );
};

// Add other icon sets as needed
export const MaterialIcons = ({ name, size, color }: { name: string; size: number; color: string }) => {
  return (
    <View testID={`material-icon-${name}`}>
      <Text style={{ display: 'none' }}>{`size:${size},color:${color}`}</Text>
    </View>
  );
};

export const FontAwesome = ({ name, size, color }: { name: string; size: number; color: string }) => {
  return (
    <View testID={`fa-icon-${name}`}>
      <Text style={{ display: 'none' }}>{`size:${size},color:${color}`}</Text>
    </View>
  );
};

// Default export for createIconSet
export default () => null;
