import { Text, View, StyleSheet } from "react-native";
import { NotificationButton } from "@/components/NotificationButton";

export function AppHeader() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Documents</Text>
			<NotificationButton
				name="notifications-outline"
				quantity={3}
				onPress={() => console.log("Notification button pressed")}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingBottom: 20,
		paddingHorizontal: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	title: {
		fontSize: 22,
		fontWeight: "bold",
	},
});
