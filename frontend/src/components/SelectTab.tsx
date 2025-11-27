import React from 'react'
import type { SelectedTabProps } from '../types'


const SelectTab: React.FC<SelectedTabProps> = ({ value, setState, options }) => {
    return (
        <select
            value={value}
            onChange={(e) => setState(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >{options.map((option) => (
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
        ))}

        </select>
    )
}

export default SelectTab