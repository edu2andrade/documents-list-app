export type DocsListType = {
	Attachments: string[];
	Contributors: { ID: string; Name: string }[];
	CreatedAt: string;
	ID: string;
	Title: string;
	UpdatedAt: string;
	Version: string;
};

export type NewDocumentType = {
	Title: string;
	Version: string;
};

export type NotificationType = {
	Timestamp: string;
	UserID: string;
	UserName: string;
	DocumentID: string;
	DocumentTitle: string;
};
