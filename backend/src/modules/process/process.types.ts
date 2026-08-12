import type { RowDataPacket } from "mysql2";

export type EventLog = {
	caseId: string;
	activity: string;
	timestamp: number;
};

export type IssueLogRow = RowDataPacket & {
	issue_id: number;
	status: string;
	created_at: string;
};
