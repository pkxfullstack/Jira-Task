export const signupFields = [
	{ name: "name", label: "Name", type: "text" },
	{ name: "email", label: "Email", type: "email" },
	{ name: "password", label: "Password", type: "password" },
	{ name: "phone", label: "Phone", type: "text" },
] as const;

export const loginFields = [
	{ name: "email", label: "Email", type: "email" },
	{ name: "password", label: "Password", type: "password" },
] as const;
