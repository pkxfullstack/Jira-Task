export type RegisterData = {
	name: string;
	email: string;
	phone: string;
	password: string;
};

export type AuthUser = {
	id: string;
	name: string;
	email: string;
	profileImageUrl?: string;
	systemRole: string;
};

export type AuthTokenPayload = {
	id: string;
	email: string;
};
