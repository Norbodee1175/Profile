import React from 'react'
import { useTable, usePagination, useSortBy } from 'react-table'
import '../css/Table.css'

export default function Table30({ columns, data }) {
    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow
    } = useTable(
        {
        columns,
        data,
        initialState: { pageSize: 30, pageIndex: 0, hiddenColumns: ['id'], sortBy: [{ id: 'BAKESTDATETIME', desc: true }]}
        },
        useSortBy, usePagination
    )

    return (
        <>
        <table className="showuser" {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
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
            {page.map(row => {
                prepareRow(row)
                return (
                <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })}
                </tr>
                )
            })}
            </tbody>
        </table>
        </>
    )
}