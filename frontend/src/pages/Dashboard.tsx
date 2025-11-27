import { useEffect, useState } from "react";
import { Contact, EyeIcon, Search, } from "lucide-react";

import useNetworkRequest from "../hooks/useNetworkRequest";
import { dashBoardErrorMessage, pieColors } from "../utils/constants";
import type { ActiveContactRs2Type, ChartRs1Type, ChartRs2Type } from "../types";
// components
import Loader from "../components/Loader";
import PieChartComponent from "../components/charts/PieChart";
import CardContainer from "../components/CardContainer";
import LineChartComponent from "../components/charts/LineChart";

import CommonTable from "../components/CommonTable";
import NotFound from "../components/NotFound";

export default function Dashboard() {
    const {
        data: activeData,
        loading: activeLoading,
        error: activeError,
        fetchData: fetchActiveData
    } = useNetworkRequest<{ rs1: { total: number }; rs2: ActiveContactRs2Type[] }>();

    const {
        data: chartData,
        loading: chartLoading,
        error: chartError,
        fetchData: fetchChartData
    } = useNetworkRequest<{ rs1: ChartRs1Type[]; rs2: ChartRs2Type[] }>();

    const [usingFallbackData, setUsingFallbackData] = useState(false);


    const safeActiveData = activeData ?? { rs1: { total: 0 }, rs2: [] };

    useEffect(() => {
        const loadData = async () => {
            try {
                await Promise.all([
                    fetchActiveData("/activecontact"),
                    fetchChartData("/chartdata")
                ]);
                setUsingFallbackData(false);
            } catch (error) {
                console.warn("Using fallback data due to API failure:", error);
                setUsingFallbackData(true);
            }
        };

        loadData();
    }, []);

    const loading = activeLoading || chartLoading;
    console.log(chartData)

    if (loading && !usingFallbackData) {
        return (
            <Loader title="Loading dashboard" />
        );
    }

    const activeContactsColumns = [
        {
            key: "name",
            header: "Status",
            align: "left" as const,
            render: (value: string, index: number) => (
                <div className="flex items-center gap-2">
                    <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: pieColors[index % pieColors.length] }}
                    ></div>
                    <span className="font-medium text-gray-700">{value}</span>
                </div>
            ),
        },
        {
            key: "count",
            header: "Count",
            align: "right" as const,
            render: (value: number) => (
                <span className="font-semibold text-gray-900">{value}</span>
            ),
        },
        {
            key: "percentage",
            header: "Percentage",
            align: "right" as const,
            render: (value: any, row: any, index: number) => {
                const percentage = (row.count / safeActiveData?.rs1.total * 100).toFixed(1);
                return <span className="text-gray-600">{percentage}%</span>;
            },
        },
    ];
    const propertyViewsColumns = [
        {
            key: "index",
            header: "M.S.#",
            align: "left" as const,
            render: (value: string, row: any, index: number) => (
                <span className="font-medium text-gray-900">#{index + 1}</span>
            ),
        },
        {
            key: "property",
            header: "Property Address",
            align: "left" as const,
            render: (value: string) => (
                <span className="text-gray-700 truncate">{value}</span>
            ),
        },
        {
            key: "searchResults",
            header: "Search Results",
            align: "right" as const,
            render: (value: string | number,) => (
                <span className="text-blue-600 font-semibold">
                    {value}
                </span>
            ),
        },
        {
            key: "listingViews",
            header: "Listing Views",
            align: "right" as const,
            render: (value: string | number) => (
                <span className="text-green-600 font-semibold">
                    {value}
                </span>
            ),
        },
    ];

    if (activeError || chartError) {
        return (
            <NotFound title={dashBoardErrorMessage} />
        );
    }

    return (
        <div className="space-y-8 p-3 md:p-6">
            {/* Page Header */}
            <div className="solid mb-4">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-600 mt-2">Monitor your contacts and property views</p>
            </div>

            {/* Active Contacts Widget */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200 bg-linear-to-r from-blue-50 to-indigo-50">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full" />
                        Active Contacts Analytics
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">Distribution of contacts by status</p>
                </div>

                <div className="m-2">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                        {/* Pie Chart */}
                        <div className="w-full h-100">
                            <PieChartComponent data={activeData?.rs2?.map(item => ({
                                name: item.name,
                                value: item.count
                            })) || []} />

                        </div>

                        {/* Data Table */}
                        <div className="space-y-4">

                            <CardContainer
                                title="Total Contact"
                                icon={<Contact className="text-blue-600 text-xl" />}
                                count={activeData?.rs1.total}
                            />

                            <div className="border border-gray-200 rounded-lg overflow-hidden">
                                <CommonTable
                                    data={activeData?.rs2 || []}
                                    columns={activeContactsColumns}
                                    rowClassName="hover:bg-gray-50 transition-colors"
                                />

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Property Views Widget */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 bg-linear-to-r from-green-50 to-emerald-50">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                        Property Views Trend
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">Daily property view statistics</p>
                </div>

                <div className="p-6 space-y-10">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/*  */}
                        <CardContainer
                            title="# of times my listings have appeared in search results"
                            icon={<Search className="text-blue-600 text-xl" />}
                            count={chartData?.rs1.reduce((sum, item) => sum + item.searchResults, 0)}
                        />
                        <CardContainer
                            title="# of times my listings have been viewed"
                            icon={<EyeIcon className="text-green-600 text-xl" />}
                            count={chartData?.rs2.reduce((sum, item) => sum + item.value, 0)}
                        />
                    </div>

                    { }
                    <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 shadow-sm w-full">
                        {/* Chart Header */}
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-6">
                            Listings in search results vs Listing Views
                        </h3>

                        {/* Chart */}
                        <div className="w-full h-64 sm:h-80 mb-10">
                            <LineChartComponent data={chartData?.rs1 || []} />

                        </div>
                        {/* Table Header */}
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
                            Listing Performance
                        </h3>

                        {/* Desktop Table */}
                        <div className="overflow-x-auto lg:block">
                            <CommonTable
                                data={chartData?.rs2 || []}
                                columns={propertyViewsColumns}
                                rowClassName="hover:bg-gray-50 transition-colors"
                            />

                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}