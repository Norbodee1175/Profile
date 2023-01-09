import React from 'react';
import { useExpanded, useGroupBy, useSortBy, useTable, usePagination } from 'react-table';
import '../css/Table.css'
import right from '../image/forward1.png'
import left from '../image/previous1.png'
import forward from '../image/forward4.png'
import previous from '../image/previous4.png'

export default function GroupPaginationTable({ columns, data }) {
const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow
} =
    useTable({ columns, data, 
        initialState: { pageSize: 30, pageIndex: 0 ,hiddenColumns: ['id'], sortBy: [{ id: 'BAKESTDATETIME', desc: true }], groupBy: ['BAKELOTNAME']} }, 
        useGroupBy, useSortBy, useExpanded, usePagination);

    const { pageIndex, pageSize } = state

    return (
        <>
            <table className='vmitable' {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps(column.id == 'id' ? column.getSortByToggleProps() : "")}>
                        {/* {column.canGroupBy && column.id === 'USERPROFILE' ? (
                        <span {...column.getGroupByToggleProps()}>
                            {' '}
                            {column.isGrouped ? '+ ' : '- '}
                        </span>
                        ) : null} */}
                        {column.render('Header')}
                        {/* <span>
                        {column.isSorted ? (column.isSortedDesc ? ' ▲' : ' ▼') : ''}
                        </span> */}
                    </th>
                    ))}
                </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                        return (
                        <td {...cell.getCellProps()}>
                            {cell.isGrouped ? (
                            // If it's a grouped cell, add an expander and row count
                            <>
                                <span {...row.getToggleRowExpandedProps()}>
                                {row.isExpanded ? '-' : '+'}
                                </span>{' '}
                                {cell.render('Cell')} ({row.subRows.length})
                            </>
                            ) : cell.isAggregated ? (
                            // If the cell is aggregated, use the Aggregated
                            // renderer for cell
                            <>
                                {cell.render('Aggregated')} ({row.subRows.length})
                                {/* {row.subRows.length < 4 ? <>{cell.render('Aggregated')}</> 
                                : <>({row.subRows.length})</>} */}
                            </>
                            ) : cell.isPlaceholder ? null : ( 
                            // For cells with repeated values, render null
                            // Otherwise, just render the regular cell
                            cell.render('Cell')
                            )}
                        </td>
                        );
                    })}
                    </tr>
                );
                })}
            </tbody>
            </table>
            <div className='menupages'>
            <img src={previous} alt="previous" onClick={() => gotoPage(0)} disabled={!canPreviousPage}/>
            {' '}
            <img src={left} alt="left" onClick={() => previousPage()} disabled={!canPreviousPage}/>
            {' '}
            <img src={right} alt="right" onClick={() => nextPage()} disabled={!canNextPage}/>
            {' '}
            <img src={forward} alt="forward" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}/>
            {' '}
            <span>
            Page{' '}
            <strong>
                {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
            </span>
            <span>
            | Go to page:{' '}
            <input
                type='number'
                defaultValue={pageIndex + 1}
                onChange={e => {
                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(pageNumber)
                }}
            />
            </span>{' '}
            <select
            value={pageSize}
            onChange={e => setPageSize(Number(e.target.value))}>
            {[30, 50, 100].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                Show {pageSize}
                </option>
            ))}
            </select>
        </div>
        </>
    );
}