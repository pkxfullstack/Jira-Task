import { Table } from "@/shared/ui/Table/Table";
import { useGetLogsQuery } from "./process.api";

const ProcessLog = () => {
	const { data, isLoading } = useGetLogsQuery({ page: 1, limit: 10 });
	console.log(data);

	return (
		<Table
			data={data || []}
			columns={[
				{
					key: "caseId",
					header: "Case ID",
				},
				{
					key: "activity",
					header: "Status",
				},
				{
					key: "timestamp",
					header: "Action At",
					render: (value) => new Date(value).toLocaleString(),
				},
			]}
			loading={isLoading}
		/>
	);
};

export default ProcessLog;
