import { NavigationContainer } from "@react-navigation/native";
import { RootStack } from "@/routes/app.routes";

interface AppNavigatorProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export function AppNavigator(props: AppNavigatorProps) {
	return (
		<NavigationContainer {...props}>
			<RootStack />
		</NavigationContainer>
	);
}
