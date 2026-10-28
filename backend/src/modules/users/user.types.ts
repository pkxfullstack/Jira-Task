export type UserType = {
	id: string;
	name: string;
	email: string;
	profile_image_url: string;
	system_role: string;
	created_at: string;
};

export type CreateUserInput = Omit<UserType, "created_at"> & {
	password: string;
	phone: string;
};
