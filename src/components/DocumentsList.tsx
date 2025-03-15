import { View, FlatList, StyleSheet, RefreshControl } from "react-native";
import { DocsListType } from "data";
import { CardList } from "@/components/CardList";
import { useState } from "react";

interface DocumentsListProps {
	documents: DocsListType[];
}

export function DocumentsList({ documents }: DocumentsListProps) {
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = () => {
		setRefreshing(true);
		setTimeout(() => {
			// TODO: Fetch new data
			// Set Skip / Limit
			console.log("Refreshed");
			setRefreshing(false);
		}, 2000);
	};

	const Items = ({ item }: { item: DocsListType }) => (
		<View style={styles.items}>
			<CardList document={item} />
		</View>
	);

	return (
		<View style={styles.container}>
			<FlatList
				data={documents}
				keyExtractor={(item) => item.ID}
				renderItem={Items}
				style={styles.flatlist}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	items: {
		marginVertical: 6,
	},
	flatlist: {
		paddingHorizontal: 6,
	},
});
