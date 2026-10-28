type Role = "USER" | "ADMIN" | "GUEST";
interface User {
	id: string;
	age: number;
	name: string;
	role?: Role;
}

function userinfo(user: User): void {
	if (user.role === "ADMIN") {
		console.log("Admin User");
	}
	console.log(user);
	const role = user.role ?? "USER";
	console.log(role);
}

function getUserLabel(user: User): string {
	return `${user.name} ${user.role ?? "USER"}`;
}

const users: User[] = [
	{ id: "1", age: 12, name: "Prem" },
	{ id: "2", age: 12, name: "Max", role: "ADMIN" },
];

users.forEach((item) => {
	userinfo(item);
	console.log(getUserLabel(item));
});
