import * as React from "react";
import * as SplashScreen from "expo-splash-screen";
import { AppNavigator } from "@/routes/app.navigator";

SplashScreen.preventAutoHideAsync();

const prefix = "documentslistapp://";

export function App() {
	return (
		<AppNavigator
			linking={{
				enabled: true,
				prefixes: [prefix],
			}}
			onReady={() => {
				SplashScreen.hideAsync();
			}}
		/>
	);
}
