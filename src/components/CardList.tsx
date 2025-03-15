import { View, StyleSheet, Text } from "react-native";
import { DocsListType } from "data";
import { formatDate } from "@/utils";
import { Ionicons } from "@expo/vector-icons";

export function CardList({ document }: { document: DocsListType }) {
	return (
		<View style={styles.container}>
			<View style={styles.cardHeader}>
				<View style={styles.titleContainer}>
					<Text style={styles.h1}>{document.Title}</Text>
					<Text style={styles.detail}>{document.Version}</Text>
				</View>
				<Text style={styles.detail}>{formatDate(document.CreatedAt)}</Text>
			</View>
			{/* Content */}
			<View style={styles.content}>
				<View style={styles.contentItem}>
					<View style={styles.contentItemHeader}>
						<Ionicons name="people-outline" size={16} color="#666" />
						<Text style={styles.h2}>Contributors</Text>
					</View>
					<View style={styles.contentItemList}>
						{document.Contributors.length > 0 &&
							document.Contributors.map((contributor) => (
								<Text key={contributor.ID} style={styles.eachItem}>
									{contributor.Name}
								</Text>
							))}
					</View>
				</View>
				<View style={styles.contentItem}>
					<View style={styles.contentItemHeader}>
						<Ionicons name="attach" size={16} color="#666" />
						<Text style={styles.h2}>Attachments</Text>
					</View>
					<View style={styles.contentItemList}>
						{document.Attachments.length > 0 &&
							document.Attachments.map((attachment) => (
								<Text key={attachment} style={styles.eachItem}>
									{attachment}
								</Text>
							))}
					</View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
		gap: 12,
		backgroundColor: "white",
		borderRadius: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 2,
		elevation: 4,
	},
	cardHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
		maxWidth: "70%",
	},
	h1: {
		fontSize: 16,
		fontWeight: "bold",
	},
	h2: {
		fontSize: 14,
		fontWeight: "bold",
	},
	detail: {
		fontSize: 12,
		color: "#666",
	},
	content: {
		flexDirection: "row",
		gap: 40,
	},
	contentItem: {
		alignItems: "flex-start",
		gap: 4,
		minWidth: "25%",
	},
	contentItemHeader: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	contentItemList: {
		gap: 4,
	},
	eachItem: {
		fontSize: 12,
		color: "#666",
	},
});
