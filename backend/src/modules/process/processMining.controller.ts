import type { NextFunction, Request, Response } from "express";
import { getAllIssuesLogs } from "./process.service.js";
import type { EventLog, IssueLogRow } from "./process.types.js";

//basically process mining has 3 part : discovery, conformance, enhancement
// Process Discovery
// Steps(practical):
// logs lo(DB se)
// groupByCase
// sort by time
// transitions nikaalo
// frequency count
//Conformance Checking
//Enhancement (improvement)

export const getIssueLogs = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const page = Number(req.query.page) || 1;
		const limit = Number(req.query.limit) || 10;
		const data = await getAllIssuesLogs(page, limit);
		const logs = dataHelper(data);
		return res.json({
			success: true,
			data: logs,
		});
	} catch (error) {
		next(error);
	}
};

const dataHelper = (data: IssueLogRow[]) => {
	const logs: EventLog[] = data.map((item) => ({
		caseId: String(item.issue_id),
		activity: item.status, // or event_title if available
		timestamp: new Date(item.created_at).getTime(),
	}));
	return logs;
};

const groupByCase = (logs: EventLog[]) => {
	const map = new Map<string, EventLog[]>();

	logs.forEach((log) => {
		let events = map.get(log.caseId);

		if (!events) {
			events = [];
			map.set(log.caseId, events);
		}

		events.push(log);
	});

	return Array.from(map.values()).map((events) =>
		events.sort((a, b) => a.timestamp - b.timestamp),
	);
};

function extractTransitions(traces: EventLog[][]) {
	const map = new Map<string, number>();
	if (!traces.length) {
		return [];
	}
	traces.forEach((events) => {
		for (let i = 0; i < events.length - 1; i++) {
			const from = events[i];
			const to = events[i + 1];

			if (!from || !to) continue;

			const key = `${from.activity}->${to.activity}`;
			map.set(key, (map.get(key) || 0) + 1);
		}
	});

	return Array.from(map.entries()).map(([key, count]) => {
		const [from, to] = key.split("->");
		return { from, to, count };
	});
}

// function getBottlenecks(traces: EventLog[][]) {
//     const map = new Map<string, number[]>();

//     traces.forEach(events => {
//         for (let i = 0; i < events.length - 1; i++) {
//             const from = events[i];
//             const to = events[i + 1];

//             const key = `${from.activity}->${to.activity}`;
//             const diff = to.timestamp - from.timestamp;

//             if (!map.has(key)) {
//                 map.set(key, []);
//             }

//             map.get(key)!.push(diff);
//         }
//     });

//     return Array.from(map.entries()).map(([key, times]) => {
//         const avg =
//             times.reduce((a, b) => a + b, 0) / times.length;

//         const [from, to] = key.split("->");

//         return { from, to, avgTime: avg };
//     });
// }

export const processFlow = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const page = Number(req.query.page) || 1;
		const limit = Number(req.query.limit) || 10;
		const data = await getAllIssuesLogs(page, limit);
		const logs = dataHelper(data);
		const traces = groupByCase(logs);
		const transitions = extractTransitions(traces);
		return res.json({
			success: true,
			data: transitions,
		});
	} catch (error) {
		next(error);
	}
};
