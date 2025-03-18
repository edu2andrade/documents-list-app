import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  visible: boolean;
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
  onHide?: () => void;
}

type ToastConfig = {
  backgroundColor: string;
  iconName: keyof typeof Ionicons.glyphMap;
  iconColor: string;
};

const TOAST_CONFIGS: Record<ToastType, ToastConfig> = {
  success: {
    backgroundColor: '#4CAF50',
    iconName: 'checkmark-circle',
    iconColor: '#FFFFFF',
  },
  error: {
    backgroundColor: '#F44336',
    iconName: 'alert-circle',
    iconColor: '#FFFFFF',
  },
  info: {
    backgroundColor: '#2196F3',
    iconName: 'information-circle',
    iconColor: '#FFFFFF',
  },
};

export function Toast({ visible, title, description, type = 'info', duration = 3000, onHide }: ToastProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-20);

  const config = TOAST_CONFIGS[type];

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 300 });
      translateY.value = withTiming(0, { duration: 300 });

      const hideTimeout = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(hideTimeout);
    }
  }, [visible]);

  const hideToast = () => {
    opacity.value = withTiming(0, { duration: 300 });
    translateY.value = withTiming(-20, { duration: 300 }, (finished) => {
      if (finished && onHide) {
        runOnJS(onHide)();
      }
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  if (!visible && opacity.value === 0) return null;

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={[styles.toast, { backgroundColor: config.backgroundColor }]}>
        <View style={styles.iconContainer}>
          <Ionicons name={config.iconName} size={24} color={config.iconColor} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{title}</Text>
          {description ? <Text style={styles.description}>{description}</Text> : null}
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    zIndex: 999,
    width: width - 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  toast: {
    flexDirection: 'row',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 4,
  },
});
