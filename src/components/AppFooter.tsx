import { useRef, useCallback, useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Input } from "./Input";

interface AppFooterProps {
	onPress: (name: string, version: string) => void;
}

export function AppFooter({ onPress }: AppFooterProps) {
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	const [name, setName] = useState("");
	const [version, setVersion] = useState("");

	const snapPoints = ["40%", "70%"];

	const handlePresentModalPress = useCallback(() => {
		setName("");
		setVersion("");
		bottomSheetModalRef.current?.present();
	}, []);

	const handleSheetChanges = useCallback((index: number) => {
		if (index === -1) {
			Keyboard.dismiss();
		}
	}, []);

	const handleAddDocument = useCallback(() => {
		if (!name.trim() || !version.trim()) return;
		Keyboard.dismiss();
		bottomSheetModalRef.current?.dismiss();
		onPress(name.trim(), version.trim());
	}, [onPress, name, version]);

	return (
		<View style={styles.container}>
			<TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={handlePresentModalPress}>
				<Ionicons name="add" size={16} color="white" />
				<Text style={{ color: "white" }}>Add document</Text>
			</TouchableOpacity>

			<BottomSheetModal
				ref={bottomSheetModalRef}
				index={0}
				snapPoints={snapPoints}
				onChange={handleSheetChanges}
				backdropComponent={(props) => (
					<BottomSheetBackdrop
						{...props}
						appearsOnIndex={0}
						disappearsOnIndex={-1}
						onPress={() => {
							Keyboard.dismiss();
							bottomSheetModalRef.current?.dismiss();
						}}
						pressBehavior="close"
						opacity={0.7}
					/>
				)}
				enableContentPanningGesture={false}
				keyboardBehavior="extend"
				handleStyle={styles.handleStyle}
			>
				<BottomSheetView style={styles.contentContainer}>
					<Text style={styles.title}>Add Document</Text>
					<Text style={styles.subtitle}>Document info</Text>
					<Input placeholder="Document title" label="Name" value={name} onChangeText={setName} />
					<Input placeholder="Document version" label="Version" value={version} onChangeText={setVersion} />
					<TouchableOpacity
						style={[styles.addButton, (!name.trim() || !version.trim()) && styles.disabledButton]}
						onPress={handleAddDocument}
						disabled={!name.trim() || !version.trim()}
					>
						<Text style={styles.addButtonText}>Submit</Text>
					</TouchableOpacity>
				</BottomSheetView>
			</BottomSheetModal>
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
	contentContainer: {
		flex: 1,
		width: "100%",
		alignItems: "flex-start",
		padding: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 4,
	},
	subtitle: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 20,
	},
	addButton: {
		backgroundColor: "#3e82f3",
		marginVertical: 20,
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 8,
		width: "100%",
		alignItems: "center",
	},
	disabledButton: {
		opacity: 0.7,
	},
	addButtonText: {
		color: "white",
		fontWeight: "bold",
		fontSize: 16,
	},
	handleStyle: {
		width: "auto",
		height: 5,
		borderRadius: 3,
	},
});
