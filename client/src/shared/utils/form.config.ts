export const userFields = [
	{
		name: "name",
		label: "Name",
		type: "text",
	},
	{
		name: "email",
		label: "Email",
		type: "email",
	},
	{
		name: "system_role",
		label: "Role",
		type: "select",
		options: [
			{ label: "Admin", value: "admin" },
			{ label: "User", value: "user" },
		],
	},
	{
		name: "phone",
		label: "Phone",
		type: "text",
	},
] as const;
