import { Text } from "@react-navigation/elements";
import { StyleSheet, View, Pressable } from "react-native";
import { RootStackScreenProps } from "@/routes/types";

type NotFoundScreenProps = RootStackScreenProps<"NotFound">;

export function NotFound({ navigation }: NotFoundScreenProps) {
	return (
		<View style={styles.container}>
			<Text>404</Text>
			<Pressable onPress={() => navigation.navigate("Home")}>
				<Text>Go to Home</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		gap: 10,
	},
});
