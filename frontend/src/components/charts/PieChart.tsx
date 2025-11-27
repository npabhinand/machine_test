import React from 'react'
import { ResponsiveContainer, PieChart, Pie, Legend, Tooltip, Cell } from 'recharts'

import { pieColors } from '../../utils/constants';
import type { PieChartProps } from '../../types';



const PieChartComponent: React.FC<PieChartProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    innerRadius={60}
                    paddingAngle={2}
                    label={({ name, percent = 0 }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                >
                    {data.map((_, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={pieColors[index % pieColors.length]}
                            stroke="#fff"
                            strokeWidth={2}
                        />
                    ))}
                </Pie>

                <Tooltip
                    formatter={(value) => [`${value} contacts`, 'Value']}
                    contentStyle={{
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                />

                <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value) =>
                        <span className="text-sm text-gray-600">{value}</span>
                    }
                />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default PieChartComponent;
