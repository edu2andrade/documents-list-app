import { useCallback } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SheetManager } from "react-native-actions-sheet";

interface AppFooterProps {
	onPress: (name: string, version: string) => void;
}

export function AppFooter({ onPress }: AppFooterProps) {
	const handlePresentModalPress = useCallback(() => {
		SheetManager.show("add-document-sheet", {
			payload: {
				onSubmit: onPress,
			},
		});
	}, [onPress]);

	return (
		<View style={styles.container}>
			<TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={handlePresentModalPress}>
				<Ionicons name="add" size={16} color="white" />
				<Text style={{ color: "white" }}>Add document</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
		borderTopWidth: 1,
		borderTopColor: "#e0e0e0",
	},
	button: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 6,
		padding: 16,
		backgroundColor: "#3e82f3",
		borderRadius: 10,
	},
});
