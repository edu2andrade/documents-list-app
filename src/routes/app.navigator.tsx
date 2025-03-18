import { NavigationContainer } from '@react-navigation/native';
import { RootStack } from '@/routes/app.routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { StyleSheet } from 'react-native';

interface AppNavigatorProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export function AppNavigator(props: AppNavigatorProps) {
  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <NavigationContainer {...props}>
          <RootStack />
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
