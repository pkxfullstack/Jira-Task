export type LogsData = {
	caseId: string;
	activity: string;
	timestamp: number;
};

export type ApiResponse<T> = {
	success: boolean;
	data: T;
	message: string;
};
