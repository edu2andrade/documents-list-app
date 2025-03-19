import { NavigationContainer } from '@react-navigation/native';
import { RootStack } from '@/routes/app.routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

interface AppNavigatorProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export function AppNavigator(props: AppNavigatorProps) {
  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer {...props}>
        <RootStack />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
