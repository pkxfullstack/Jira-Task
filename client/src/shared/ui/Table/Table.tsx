import {
    Table as MuiTable,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    TableContainer,
} from "@mui/material";
import type { Column } from "./types";

type TableProps<T> = {
    data: T[];
    columns: Column<T>[];
    loading?: boolean;
};

export function Table<T>({ data, columns, loading }: TableProps<T>) {
    if (loading) return "Loading...";
    if (!data.length) return "No Data Found";

    return (
        <TableContainer component={Paper} >
            <MuiTable>
                <TableHead>
                    <TableRow>
                        {
                            columns.map((col) => (
                                <TableCell key={String(col.key)
                                } >
                                    <b>{col.header} </b>
                                </TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>

                <TableBody>
                    {
                        data.map((row, i) => (
                            <TableRow key={i} >
                                {
                                    columns.map((col) => {
                                        const value = row[col.key];

                                        return (
                                            <TableCell key={String(col.key)
                                            } >
                                                {col.render ? col.render(value, row) : String(value)}
                                            </TableCell>
                                        );
                                    })}
                            </TableRow>
                        ))}
                </TableBody>
            </MuiTable>
        </TableContainer>
    );
}