import React from 'react';

import type { CommonTableProps } from '../types';



const CommonTable: React.FC<CommonTableProps> = ({
    data,
    columns,
    emptyMessage = "No data available",
    className = "",
    rowClassName = "",
    onRowClick,
    selectable = false,
    selectedRows = new Set(),
    onSelectRow,
    onSelectAll
}) => {
    if (!data || data.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                {emptyMessage}
            </div>
        );
    }

    const getAlignmentClass = (align: 'left' | 'right' | 'center' = 'left') => {
        switch (align) {
            case 'right':
                return 'text-right';
            case 'center':
                return 'text-center';
            default:
                return 'text-left';
        }
    };

    const allSelected = data.length > 0 && data.every(row => selectedRows.has(row.id));

    return (
        <table className={`w-full ${className}`}>
            <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                    {selectable && (
                        <th className="w-12 p-4">
                            <input
                                type="checkbox"
                                checked={allSelected}
                                onChange={(e) => onSelectAll?.(e.target.checked)}
                                className="rounded border-gray-300"
                            />
                        </th>
                    )}
                    {columns.map((column) => (
                        <th
                            key={column.key}
                            className={`p-4 font-semibold text-gray-700 ${getAlignmentClass(column.align)}`}
                        >
                            {column.renderHeader ? column.renderHeader() : column.header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr
                        key={row.id || index}
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${onRowClick ? 'cursor-pointer' : ''
                            } ${rowClassName}`}
                        onClick={() => onRowClick?.(row, index)}
                    >
                        {selectable && (
                            <td className="p-4">
                                <input
                                    type="checkbox"
                                    checked={selectedRows.has(row.id)}
                                    onChange={() => onSelectRow?.(row.id)}
                                    className="rounded border-gray-300"
                                />
                            </td>
                        )}
                        {columns.map((column) => (
                            <td
                                key={column.key}
                                className={`p-4 ${getAlignmentClass(column.align)}`}
                            >
                                {column.render
                                    ? column.render(row[column.key], row, index)
                                    : row[column.key]
                                }
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CommonTable;