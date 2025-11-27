import React, { useState, useEffect } from 'react';
import { Search, Download, MoreVertical, User, Mail, Phone, ChevronUp, ChevronDown } from 'lucide-react';

// utils
import useNetworkRequest from '../hooks/useNetworkRequest';
import type { Contact } from '../types';
// components
import Pagination from '../components/Pagination';
import ConfirmModal from '../components/ConfirmModal';
import CommonTable from '../components/CommonTable';
import SelectTab from '../components/SelectTab';
import { categoryOptions, statusOptions } from '../data/data';
import NotFound from '../components/NotFound';
import { contactsErrorMessage } from '../utils/constants';

interface SortConfig {
    key: string;
    direction: 'asc' | 'desc';
}

const contactColumns = (sortConfig: SortConfig, handleSort: (key: string) => void) => [
    {
        key: "contact",
        header: "Contact",
        sortable: true,
        render: (_: unknown, row: Contact) => (
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                    <div className="font-semibold text-gray-900">{row.name}</div>
                    <div className="text-sm text-gray-500">{row.email}</div>
                </div>
            </div>
        ),
    },
    {
        key: "company",
        header: "Company & Position",
        sortable: true,
        render: (_: unknown, row: Contact) => (
            <div className='min-w-[200px]'>
                <div className="font-medium text-gray-900">{row.company}</div>
                <div className="text-sm text-gray-500">{row.position}</div>
            </div>
        ),
    },
    {
        key: "contactInfo",
        header: "Contact Info",
        sortable: false,
        render: (_: unknown, row: Contact) => (
            <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{row.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{row.phone}</span>
                </div>
            </div>
        ),
    },
    {
        key: "status",
        header: "Status",
        sortable: true,
        render: (_: unknown, row: Contact) => (
            <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${row.status === "Active"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                    }`}
            >
                {row.status}
            </span>
        ),
    },
    {
        key: "category",
        header: "Category",
        sortable: true,
        render: (_: unknown, row: Contact) => (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {row.category}
            </span>
        ),
    },
    {
        key: "lastContact",
        header: "Last Contact",
        sortable: true,
        render: (_: unknown, row: Contact) => (
            <span className="text-sm text-gray-500">
                {new Date(row.lastContact).toLocaleDateString()}
            </span>
        ),
    },
    {
        key: "actions",
        header: "",
        sortable: false,
        render: () => (
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical className="w-4 h-4 text-gray-400" />
            </button>
        ),
    },
].map(column => ({
    ...column,
    renderHeader: () => (
        <button
            onClick={() => column.sortable && handleSort(column.key)}
            className={`flex items-center gap-1 font-semibold text-gray-700 ${column.sortable ? 'hover:text-gray-900 cursor-pointer' : 'cursor-default'
                }`}
        >
            {column.header}
            {(
                sortConfig.direction === 'asc' ? (
                    <ChevronUp className="w-4 h-4" />
                ) : (
                    <ChevronDown className="w-4 h-4" />
                )
            )}
        </button>
    )
}));

export default function Contacts() {
    const { data, error, fetchData } = useNetworkRequest<{ contacts: Contact[]; total: number }>();

    const [selectedContacts, setSelectedContacts] = useState<Set<number>>(new Set());
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
    const [sortConfig, setSortConfig] = useState<SortConfig>({
        key: 'name',
        direction: 'asc'
    });

    // Debounce effect
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    // Fetch when page, filters, sort, or debounced search changes
    useEffect(() => {
        const params = new URLSearchParams({
            page: currentPage.toString(),
            limit: itemsPerPage.toString(),
            sortBy: sortConfig.key,
            sortOrder: sortConfig.direction,
            ...(debouncedSearch && { search: debouncedSearch }),
            ...(statusFilter !== 'all' && { status: statusFilter }),
            ...(categoryFilter !== 'all' && { category: categoryFilter }),
        });

        fetchData(`/contacts?${params}`);
    }, [currentPage, debouncedSearch, statusFilter, categoryFilter, sortConfig,]);

    // Handle sort
    const handleSort = (key: string) => {
        setSortConfig(prevConfig => ({
            key,
            direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
        }));
        // Reset to first page when sorting
        setCurrentPage(1);
    };

    // handle select all contacts
    const handleSelectAll = (checked: boolean) => {
        if (checked && data?.contacts) {
            setSelectedContacts(new Set(data.contacts.map(contact => contact.id)));
        } else {
            setSelectedContacts(new Set());
        }
    };

    // handle select each contact
    const handleSelectContact = (id: number | string) => {
        const numericId = Number(id);
        setSelectedContacts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(numericId)) {
                newSet.delete(numericId);
            } else {
                newSet.add(numericId);
            }
            return newSet;
        });
    };

    // to confirm Delete
    const openBulkDeleteConfirm = () => {
        if (selectedContacts.size > 0) {
            setConfirmOpen(true);
        }
    };

    // handle delete
    const handleBulkDelete = async () => {
        const ids = Array.from(selectedContacts);
        if (ids.length === 0) return;

        try {
            await fetchData("/contacts", {
                method: "DELETE",
                data: { ids }
            });

            // Clear selection
            setSelectedContacts(new Set());

            // Refresh contacts list
            const params = new URLSearchParams({
                page: currentPage.toString(),
                limit: itemsPerPage.toString(),
                sortBy: sortConfig.key,
                sortOrder: sortConfig.direction,
            });
            fetchData(`/contacts?${params}`);
            setConfirmOpen(false);
        } catch (err) {
            console.error("Bulk delete failed:", err);
        }
    };

    const handleBulkExport = () => {
        if (selectedContacts.size > 0) {
            // Implement bulk export logic
            console.log('Exporting contacts:', Array.from(selectedContacts));
        }
    };

    const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 0;

    // if error occurs show NotFound component
    if (error) {
        return (
            <NotFound title={contactsErrorMessage} />
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Contacts</h1>
                <p className="text-gray-600">Manage your contacts and their information</p>
            </div>

            {/* Filter Container */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 mb-6">
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                    {/* Search Bar */}
                    <div className="w-full lg:w-auto flex-1">
                        <div className="relative max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                            <input
                                type="text"
                                placeholder="Search contacts..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                        {/* select Status */}
                        <SelectTab value={statusFilter} setState={setStatusFilter} options={statusOptions} />
                        {/* select Filter */}
                        <SelectTab value={categoryFilter} setState={setCategoryFilter} options={categoryOptions} />
                    </div>

                    {/* Sort Info */}
                    <div className="text-sm text-gray-500 hidden lg:block">
                        Sorted by: <span className="font-medium capitalize">{sortConfig.key}</span> ({sortConfig.direction})
                    </div>

                    {/*  Actions */}
                    {selectedContacts.size > 0 && (
                        <div className="flex gap-2 w-full lg:w-auto">
                            <button
                                onClick={handleBulkExport}
                                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                <Download className="w-4 h-4" />
                                Export ({selectedContacts.size})
                            </button>
                            <button
                                onClick={openBulkDeleteConfirm}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                Delete Selected
                            </button>
                            {/* Modal to confirm Delete */}
                            <ConfirmModal
                                open={confirmOpen}
                                onConfirm={handleBulkDelete}
                                onCancel={() => setConfirmOpen(false)}
                                title="Delete Contacts?"
                                message={`You are about to delete ${selectedContacts.size} contacts. This action cannot be undone.`}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Contacts Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Desktop Table */}
                <div className="lg:block overflow-x-auto">
                    <CommonTable
                        data={data?.contacts || []}
                        columns={contactColumns(sortConfig, handleSort)}
                        selectable={true}
                        selectedRows={selectedContacts}
                        onSelectRow={handleSelectContact}
                        onSelectAll={handleSelectAll}
                    />
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <Pagination
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        data={data}
                        totalPages={totalPages}
                    />
                )}
            </div>
        </div>
    );
}