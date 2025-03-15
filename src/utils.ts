export function formatDate(date: string) {
	const dateObj = new Date(date);
	return dateObj.toLocaleDateString("en-GB", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}
