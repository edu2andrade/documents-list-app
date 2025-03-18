import { Text, View, StyleSheet, Alert } from "react-native";
import { NotificationButton } from "@/components/NotificationButton";
import { useNotifications } from "@/contexts/NotificationsContext";

export function AppHeader() {
	const { notifications, clearNotifications } = useNotifications();

	function handleClearNotifications() {
		Alert.alert("Clear Notifications", "Are you sure you want to clear all notifications?", [
			{
				text: "Cancel",
				onPress: () => console.log("Cancel Pressed"),
				style: "cancel",
			},
			{
				text: "Clear",
				onPress: () => clearNotifications(),
			},
		]);
	}
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Documents</Text>
			<NotificationButton
				name="notifications-outline"
				quantity={notifications.length > 0 ? notifications.length : undefined}
				onPress={handleClearNotifications}
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
