import type React from "react";

export type Column<T> = {
	key: keyof T; // kis field ka data dikhana h
	header: string; // column ka naam
	render?: (value: T[keyof T], row: T) => React.ReactNode;
};
