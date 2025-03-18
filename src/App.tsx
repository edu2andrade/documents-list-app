import * as React from "react";
import * as SplashScreen from "expo-splash-screen";
import { AppNavigator } from "@/routes/app.navigator";
import { NotificationsProvider } from "./contexts/NotificationsContext";
import { ToastProvider } from "./contexts/ToastContext";
import { SheetProvider } from "react-native-actions-sheet";
import "./sheets";

SplashScreen.preventAutoHideAsync();

const prefix = "documentslistapp://";

export function App() {
	return (
		<NotificationsProvider>
			<ToastProvider>
				<SheetProvider>
					<AppNavigator
						linking={{
							enabled: true,
							prefixes: [prefix],
						}}
						onReady={() => {
							SplashScreen.hideAsync();
						}}
					/>
				</SheetProvider>
			</ToastProvider>
		</NotificationsProvider>
	);
}
