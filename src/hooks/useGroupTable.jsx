import React from 'react';
import { useExpanded, useGroupBy, useSortBy, useTable } from 'react-table';
import '../css/Table.css'

export default function GroupTable({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data, 
        initialState: { hiddenColumns: ['id'], sortBy: [{ id: 'id', desc: true }], groupBy: ['BAKELOTNAME']} }, 
        useGroupBy, useSortBy, useExpanded);

  return (
    <table className='showuser' {...getTableProps()}>
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
        {rows.map((row) => {
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
  );
}