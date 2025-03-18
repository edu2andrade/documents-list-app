import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/routes/types';
import { Home } from '@/screens/Home';
import { NotFound } from '@/screens/NotFound';

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export function RootStack() {
  return (
    <Navigator initialRouteName="Home">
      <Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Screen name="NotFound" component={NotFound} />
    </Navigator>
  );
}
