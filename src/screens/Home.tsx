import { StyleSheet, View, Text } from "react-native";
import { AppHeader } from "@/components/AppHeader";

export function Home() {
	return (
		<View style={styles.container}>
			<AppHeader />
			<View style={styles.content}>
				<Text>Home Screen</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 70,
		paddingBottom: 30,
		backgroundColor: "#fff",
	},
	content: {
		flex: 1,
		width: "100%",
		justifyContent: "flex-start",
		paddingHorizontal: 20,
		paddingVertical: 20,
		gap: 20,
		backgroundColor: "#ececec",
	},
});
