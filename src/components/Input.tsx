import { TextInput, StyleSheet, View, Text, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
	placeholder: string;
	label: string;
}

export function Input({ placeholder, label, ...props }: InputProps) {
	return (
		<View style={styles.container}>
			<Text style={styles.label}>{label}</Text>
			<TextInput
				style={styles.input}
				placeholder={placeholder}
				autoCapitalize="none"
				autoCorrect={false}
				returnKeyType="done"
				{...props}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
	},
	input: {
		height: 40,
		width: "100%",
		borderWidth: 1,
		borderColor: "#e0e0e0",
		borderRadius: 8,
		marginBottom: 12,
		paddingHorizontal: 12,
	},
	label: {
		marginBottom: 4,
		fontSize: 12,
		fontWeight: "semibold",
	},
});
