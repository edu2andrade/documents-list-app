import { useState, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { AppHeader } from "@/components/AppHeader";
import { DocsList } from "data";
import { DocumentsList } from "@/components/DocumentsList";
import { DocumentsGrid } from "@/components/DocumentsGrid";
import { ViewSelector } from "@/components/ViewSelector";
import { SortDropdown, SortOption } from "@/components/SortDropdown";

export function Home() {
	const [viewState, setViewState] = useState<"grid" | "list">("grid");
	const [sortOption, setSortOption] = useState<SortOption>({
		label: "Created (Newest first)",
		value: "createdAt_desc",
	});

	const toggleView = () => {
		setViewState((prev) => (prev === "grid" ? "list" : "grid"));
	};

	const handleSortChange = (option: SortOption) => {
		setSortOption(option);
	};

	const sortedDocuments = useMemo(() => {
		const docs = [...DocsList];

		if (sortOption.value === "createdAt_asc") {
			return docs.sort((a, b) => {
				return new Date(a.CreatedAt).getTime() - new Date(b.CreatedAt).getTime();
			});
		} else if (sortOption.value === "createdAt_desc") {
			return docs.sort((a, b) => {
				return new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime();
			});
		}

		return docs;
	}, [sortOption]);

	const documentView = useMemo(() => {
		return viewState === "grid" ? (
			<DocumentsGrid documents={sortedDocuments} />
		) : (
			<DocumentsList documents={sortedDocuments} />
		);
	}, [viewState, sortedDocuments]);

	return (
		<View style={styles.container}>
			<AppHeader />
			<View style={styles.content}>
				<View style={styles.controlsRow}>
					<SortDropdown onSortChange={handleSortChange} currentSort={sortOption} />
					<ViewSelector toggleView={toggleView} viewState={viewState} />
				</View>
				{documentView}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 70,
		paddingBottom: 30,
		backgroundColor: "#fff",
	},
	content: {
		flex: 1,
		width: "100%",
		justifyContent: "flex-start",
		paddingHorizontal: 20,
		paddingVertical: 20,
		gap: 20,
		backgroundColor: "#f6f6f6",
	},
	controlsRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		paddingHorizontal: 6,
	},
});
