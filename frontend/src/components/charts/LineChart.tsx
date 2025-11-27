import React from 'react'
import { CartesianGrid, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, LineChart } from 'recharts'

import type { LineChartProps } from '../../types'



const LineChartComponent: React.FC<LineChartProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                <XAxis
                    dataKey="date"
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: '#e5e7eb' }}
                    interval="preserveStartEnd"
                />
                <YAxis
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: '#e5e7eb' }}
                />
                <Tooltip
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '14px' }}
                    formatter={(value) => [`${value}`, 'Views']}
                    labelFormatter={(label) => `Date: ${label}`}
                />
                <Legend wrapperStyle={{ fontSize: '14px', paddingTop: '10px' }} />
                <Line
                    type="monotone"
                    dataKey="searchResults"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', r: 3 }}
                    activeDot={{ r: 5, fill: '#1d4ed8' }}
                    name="Search Results"
                />
                <Line
                    type="monotone"
                    dataKey="listingViews"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ fill: '#10b981', r: 3 }}
                    activeDot={{ r: 5, fill: '#059669' }}
                    name="Listing Views"
                />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default LineChartComponent
