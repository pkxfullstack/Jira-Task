export type userData = {
	id: string;
	name: string;
	email: string;
	phone: string;
	created_at: string;
	system_role: string;
	profile_image_url: string;
};

export type CreateUserInput = {
	name: string;
	phone: string;
	email: string;
	system_role: string;
};
