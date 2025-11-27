import React from 'react';

interface TableColumn {
    key: string;
    header: string;
    align?: "left" | "center" | "right";
    render?: (value: any, row: any, index: number) => React.ReactNode;
}



interface CommonTableProps {
    data: any[];
    columns: TableColumn[];
    emptyMessage?: string | React.ReactNode;
    className?: string;
    rowClassName?: string;
    onRowClick?: (row: any, index: number) => void;
    // New props for selection
    selectable?: boolean;
    selectedRows?: Set<string | number>;
    onSelectRow?: (id: string | number) => void;
    onSelectAll?: (checked: boolean) => void;
    selectionKey?: string; // key to use for selection (default: 'id')
}

const CommonTable: React.FC<CommonTableProps> = ({
    data,
    columns,
    emptyMessage = "No data available",
    className = "",
    rowClassName = "",
    onRowClick,
    // Selection props
    selectable = false,
    selectedRows = new Set(),
    onSelectRow,
    onSelectAll,
    selectionKey = 'id'
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
            case 'right': return 'text-right';
            case 'center': return 'text-center';
            default: return 'text-left';
        }
    };

    // Add checkbox column if selectable
    const finalColumns = selectable ? [
        {
            key: '_checkbox',
            header: (
                <input
                    type="checkbox"
                    checked={data.length > 0 && selectedRows.size === data.length}
                    onChange={(e) => onSelectAll?.(e.target.checked)}
                    className="rounded border-gray-300"
                />
            ),
            align: 'center' as const,
            render: (_: unknown, row: any) => (
                <input
                    type="checkbox"
                    checked={selectedRows.has(row[selectionKey])}
                    onChange={() => onSelectRow?.(row[selectionKey])}
                    className="rounded border-gray-300"
                />
            )
        },
        ...columns
    ] : columns;

    return (
        <table className={`w-full ${className}`}>
            <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                    {finalColumns.map((column) => (
                        <th
                            key={column.key}
                            className={`p-4 font-semibold text-gray-700 ${getAlignmentClass(column.align)}`}
                        >
                            {column.header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr
                        key={index}
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${onRowClick ? 'cursor-pointer' : ''
                            } ${rowClassName}`}
                        onClick={() => onRowClick?.(row, index)}
                    >
                        {finalColumns.map((column) => (
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