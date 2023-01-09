import React from "react";
import { useTable, useSortBy } from "react-table";
import '../css/Table.css'

export default function Table({ columns, data }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable(
        {
        columns,
        data,
        initialState: { hiddenColumns: ['id'], sortBy: [{ id: 'id', desc: false }]}
        },
        useSortBy
    )
    // Render the UI for your table
    return (
        <>
        <table className="showuser" {...getTableProps()}>
        <thead>
            {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps(column.id == 'id' ? column.getSortByToggleProps() : "")}>
                        {column.render('Header')}
                    </th>
                ))}
                </tr>
            ))}
        </thead>
        <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
            prepareRow(row);
            return (
                <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
                </tr>
            );
            })}
        </tbody>
        </table>
        </>
    );
}