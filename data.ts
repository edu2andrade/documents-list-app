export type DocsListType = {
	Attachments: string[];
	Contributors: { ID: string; Name: string }[];
	CreatedAt: string;
	ID: string;
	Title: string;
	UpdatedAt: string;
	Version: string;
};

export const DocsList: DocsListType[] = [
	{
		Attachments: ["Russian Imperial Stout"],
		Contributors: [
			{
				ID: "1a6c9f1d-8dd4-4b9e-8ff9-9e4e2e9c2c7e",
				Name: "Ephraim Hessel",
			},
			{
				ID: "2f2f7c7c-1e0a-4f39-8a21-7e3b45f23fa6",
				Name: "Lola Yost",
			},
		],
		CreatedAt: "1905-01-14T14:01:51.454181502Z",
		ID: "8a5a5a5a-8a5a-8a5a-8a5a-8a5a5a5a8a5a",
		Title: "Imperial Russian Stout",
		UpdatedAt: "1944-03-17T04:01:42.455184601Z",
		Version: "5.5.0",
	},
	{
		Attachments: ["Belgian Tripel"],
		Contributors: [
			{
				ID: "5a6c1f1d-8dd4-4b9e-8ff9-9e4e2e9c2c7e",
				Name: "Ephraim Hessel",
			},
			{
				ID: "6f2f7c7c-1e0a-4f39-8a21-7e3b45f23fa6",
				Name: "Lola Yost",
			},
		],
		CreatedAt: "1905-01-14T14:01:51.454181502Z",
		ID: "9a5a5a5a-8a5a-8a5a-8a5a-8a5a5a5a8a5a",
		Title: "Belgian Tripel",
		UpdatedAt: "1944-03-17T04:01:42.455184601Z",
		Version: "5.5.0",
	},
	{
		Attachments: ["Mead"],
		Contributors: [
			{
				ID: "1bbb6853-390f-49aa-a002-fb60908f8b0e",
				Name: "Hermann Lowe",
			},
		],
		CreatedAt: "1993-11-12T00:55:44.438198299Z",
		ID: "d7e00994-75e6-48f1-b778-e5d31ead713z",
		Title: "Mead",
		UpdatedAt: "2023-03-29T03:01:42.455184601Z",
		Version: "5.6.1",
	},
	{
		Attachments: ["European Amber Lager", "Wood-aged Beer"],
		Contributors: [
			{
				ID: "1b41861e-51e2-4bf4-ba13-b20f01ce81ef",
				Name: "Jasen Crona",
			},
			{
				ID: "2a1d6ed0-7d2d-4dc6-b3ea-436a38fd409e",
				Name: "Candace Jaskolski",
			},
			{
				ID: "9ae28565-4a1c-42e3-9ae8-e39e6f783e14",
				Name: "Rosemarie Schaden",
			},
		],
		CreatedAt: "1912-03-08T06:01:39.382278739Z",
		ID: "69517c79-a4b2-4f64-9c83-20e5678e4519",
		Title: "Arrogant Bastard Ale",
		UpdatedAt: "1952-02-29T22:21:13.817038244Z",
		Version: "5.3.15",
	},
	{
		Attachments: ["Strong Ale", "Stout", "Dark Lager", "Belgian Strong Ale"],
		Contributors: [
			{
				ID: "1bbb6853-390f-49aa-a002-fb60908f8b0e",
				Name: "Hermann Lowe",
			},
		],
		CreatedAt: "1993-11-12T00:55:44.438198299Z",
		ID: "d7e00994-75e6-48f1-b778-e5d31ead713h",
		Title: "Ten FIDY",
		UpdatedAt: "1946-04-15T06:09:44.564202073Z",
		Version: "5.1.15",
	},
	{
		Attachments: ["Bock", "English Pale Ale", "Wood-aged Beer", "Belgian And French Ale"],
		Contributors: [
			{
				ID: "de30f704-1102-40f4-8517-a0361378370c",
				Name: "Velda Watsica",
			},
			{
				ID: "f65b8ce0-1276-4a07-899c-a41387c9360c",
				Name: "Helmer Hauck",
			},
		],
		CreatedAt: "2007-12-11T02:35:33.701912202Z",
		ID: "fe6ad6ed-a5bd-480b-8688-fd3652b2a6d9",
		Title: "Orval Trappist Ale",
		UpdatedAt: "1972-01-02T13:12:29.948799707Z",
		Version: "1.3.1",
	},
];
