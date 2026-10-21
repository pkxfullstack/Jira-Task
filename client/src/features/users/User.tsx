import PageHeader from "@/shared/components/pageheader/PageHeader"
import type { Column } from "@/shared/ui/Table/types"
import Modal from "@/shared/components/modal/Modal"
import { useGetUserQuery } from "./users.api"
import type { userData } from "./users.type"
import Table from "@/shared/ui/Table/Table"
import { Box, Button } from "@mui/material"
import { useMemo, useState } from "react"

const User = () => {
    const [open, setOpen] = useState(false);
    const { data, isLoading } = useGetUserQuery({ page: 1, limit: 10 })

    const columns: Column<userData>[] = useMemo(() => [
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
    ], []);

    return (
        <Box component={"section"}>
            <Modal
                title={"Add User"}
                action={
                    <Button variant="contained" onClick={() => { setOpen(false) }}>Close</Button>
                }
                open={open}
                content={"Hello"}
                onClose={() => setOpen(false)}
            />
            <PageHeader
                title={"Users"}
                description="Manage your users"
                action={<Button variant="contained" onClick={() => { setOpen(true) }}>Add User</Button>}
            />
            <Table
                data={data || []}
                columns={columns || []}
                loading={isLoading}
            />
        </Box>
    )
}

export default User