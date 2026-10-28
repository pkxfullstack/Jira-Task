import { Box, Button } from "@mui/material";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useMemo, useState } from "react";
import { ReusableForm } from "@/shared/components/common/ReusableForm";
import Modal from "@/shared/components/modal/Modal";
import PageHeader from "@/shared/components/pageheader/PageHeader";
import { showSnackbar } from "@/shared/ui/snackbar.slice";
import Table from "@/shared/ui/Table/Table";
import type { Column } from "@/shared/ui/Table/types";
import { userFields } from "@/shared/utils/form.config";
import { userSchema } from "@/shared/utils/form.schema";
import { useAppDispatch } from "@/store/hooks";
import { useCreateUserMutation, useGetUserQuery } from "./users.api";
import type { CreateUserInput, userData } from "./users.type";

const User = () => {
	const dispatch = useAppDispatch();
	const [open, setOpen] = useState(false);
	const { data, isLoading } = useGetUserQuery({ page: 1, limit: 10 });
	const [createUser, { isLoading: loading, error }] = useCreateUserMutation();

	const columns: Column<userData>[] = useMemo(
		() => [
			{
				key: "id",
				header: "ID",
			},
			{
				key: "name",
				header: "Name",
			},
			{
				key: "email",
				header: "Email",
			},
			{
				key: "phone",
				header: "Mobile",
			},
			{
				key: "created_at",
				header: "Added At",
				render: (value: string) => new Date(value).toLocaleString(),
			},
		],
		[],
	);

	const submitForm = async (data: CreateUserInput) => {
		try {
			const user = await createUser(data).unwrap();
			dispatch(
				showSnackbar({
					message: user?.message || "User created successfully!",
					severity: "success",
				}),
			);
			setOpen(false);
		} catch {
			const err = error as FetchBaseQueryError;
			if ("data" in err) {
				dispatch(
					showSnackbar({
						message:
							(err.data as { message?: string })?.message ||
							"An error occurred",
						severity: "error",
					}),
				);
			}
			console.log(error);
		}
	};

	return (
		<Box component={"section"}>
			<Modal
				title={"Add User"}
				action={
					<Button
						variant="contained"
						onClick={() => {
							setOpen(false);
						}}
					>
						Close
					</Button>
				}
				open={open}
				content={
					<ReusableForm
						fields={userFields}
						schema={userSchema}
						onSubmit={submitForm}
						buttonText="submit"
						loading={loading}
						serverErrors={
							error && "data" in error
								? (error.data as Record<string, string>)
								: undefined
						}
					/>
				}
				onClose={() => setOpen(false)}
			/>
			<PageHeader
				title={"Users"}
				description="Manage your users"
				action={
					<Button
						variant="contained"
						onClick={() => {
							setOpen(true);
						}}
					>
						Add User
					</Button>
				}
			/>
			<Table data={data || []} columns={columns || []} loading={isLoading} />
		</Box>
	);
};

export default User;
