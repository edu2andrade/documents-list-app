import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type SortOption = {
	label: string;
	value: "createdAt_asc" | "createdAt_desc";
};

interface SortDropdownProps {
	onSortChange: (sortOption: SortOption) => void;
	currentSort: SortOption;
}

export function SortDropdown({ onSortChange, currentSort }: SortDropdownProps) {
	const [modalVisible, setModalVisible] = useState(false);

	const sortOptions: SortOption[] = [
		{ label: "Created (Oldest first)", value: "createdAt_asc" },
		{ label: "Created (Newest first)", value: "createdAt_desc" },
	];

	const toggleModal = () => {
		setModalVisible(!modalVisible);
	};

	const selectOption = (option: SortOption) => {
		onSortChange(option);
		toggleModal();
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.dropdownButton} onPress={toggleModal}>
				<View style={styles.iconContainer}>
					<Ionicons name="chevron-expand-outline" size={16} color="black" />
				</View>
				<Text style={styles.dropdownText}>Sort by</Text>
				<View style={styles.chevronContainer}>
					<Ionicons name="chevron-down-outline" size={12} color="black" />
				</View>
			</TouchableOpacity>

			<Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={toggleModal}>
				<TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={toggleModal}>
					<View style={styles.modalContent}>
						{sortOptions.map((option) => (
							<TouchableOpacity
								key={option.value}
								style={[styles.optionItem, currentSort.value === option.value && styles.selectedOption]}
								onPress={() => selectOption(option)}
							>
								<Text style={[styles.optionText, currentSort.value === option.value && styles.selectedOptionText]}>
									{option.label}
								</Text>
							</TouchableOpacity>
						))}
					</View>
				</TouchableOpacity>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "relative",
	},
	dropdownButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		backgroundColor: "#fff",
		borderRadius: 6,
		height: 32,
		paddingHorizontal: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
	},
	iconContainer: {
		marginRight: 10,
		height: 20,
		justifyContent: "center",
	},
	dropdownText: {
		fontSize: 14,
		fontWeight: "500",
		color: "#333",
	},
	chevronContainer: {
		marginLeft: 10,
	},
	modalOverlay: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		backgroundColor: "#fff",
		borderRadius: 10,
		padding: 10,
		width: "80%",
		maxWidth: 300,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	optionItem: {
		paddingVertical: 12,
		paddingHorizontal: 15,
		borderRadius: 5,
	},
	selectedOption: {
		backgroundColor: "#f0f0f0",
	},
	optionText: {
		fontSize: 16,
		color: "#333",
	},
	selectedOptionText: {
		fontWeight: "600",
	},
});
