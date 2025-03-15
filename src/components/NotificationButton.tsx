import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface NotificationButtonProps {
	name: keyof typeof Ionicons.glyphMap;
	size?: number;
	color?: string;
	onPress: () => void;
	quantity?: number;
}

export function NotificationButton({ name, size = 20, color = "black", onPress, quantity }: NotificationButtonProps) {
	return (
		<TouchableOpacity activeOpacity={0.5} onPress={onPress} style={styles.container}>
			<Ionicons name={name} size={size} color={color} />
			{quantity && (
				<View style={styles.quantity}>
					<Text style={styles.quantityText}>{quantity}</Text>
				</View>
			)}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		borderWidth: 1,
		borderColor: "#e0e0e0",
		borderRadius: 6,
	},
	quantity: {
		position: "absolute",
		top: 2,
		right: 2,
		height: 16,
		width: 16,
		padding: 2,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 12,
		backgroundColor: "#3e82f3",
	},
	quantityText: {
		color: "white",
		fontSize: 8,
		fontWeight: "bold",
	},
});
