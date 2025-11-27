import React from "react";
import type { CardContainerProps } from "../types";



const CardContainer: React.FC<CardContainerProps> = ({ title, icon, count }) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-3xl font-bold text-gray-900">{count}</p>
                </div>
                {icon && (
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        {icon}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CardContainer;