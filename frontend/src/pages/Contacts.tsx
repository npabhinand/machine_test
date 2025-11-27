import React, { useState, useEffect } from 'react';
import { Search, Download, MoreVertical, User, Mail, Phone, } from 'lucide-react';
import useNetworkRequest from '../hooks/useNetworkRequest';
import type { Contact } from '../types';
import Pagination from '../components/Pagination';
import ConfirmModal from '../components/ConfirmModal';
import CommonTable from '../components/CommonTable';
import SelectTab from '../components/SelectTab';


const contactColumns = [
    {
        key: "contact",
        header: "Contact",
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
        render: (_: unknown, row: Contact) => (
            <div>
                <div className="font-medium text-gray-900">{row.company}</div>
                <div className="text-sm text-gray-500">{row.position}</div>
            </div>
        ),
    },
    {
        key: "contactInfo",
        header: "Contact Info",
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
        render: (_: unknown, row: Contact) => (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {row.category}
            </span>
        ),
    },
    {
        key: "lastContact",
        header: "Last Contact",
        render: (_: unknown, row: Contact) => (
            <span className="text-sm text-gray-500">
                {new Date(row.lastContact).toLocaleDateString()}
            </span>
        ),
    },
    {
        key: "actions",
        header: "",

        render: () => (
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical className="w-4 h-4 text-gray-400" />
            </button>
        ),
    },
];
const statusOptions = [
    { label: 'All Status', value: 'all' },
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' },
];
const categoryOptions = [
    { label: 'All Categories', value: 'all' },
    { label: 'Work', value: 'Work' },
    { label: 'Personal', value: 'Personal' },
    { label: 'Business', value: 'Business' },
];

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

    // Debounce effect
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 500); // 500ms debounce

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    // Fetch when page, filters, or debounced search changes
    useEffect(() => {
        const params = new URLSearchParams({
            page: currentPage.toString(),
            limit: itemsPerPage.toString(),
            ...(debouncedSearch && { search: debouncedSearch }),
            ...(statusFilter !== 'all' && { status: statusFilter }),
            ...(categoryFilter !== 'all' && { category: categoryFilter }),
        });

        fetchData(`/contacts?${params}`);
    }, [currentPage, debouncedSearch, statusFilter, categoryFilter]);

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
    // toconfirm Delete
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
            fetchData(`/contacts?page=${currentPage}&limit=${itemsPerPage}`);
            setConfirmOpen(false)
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

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Failed to Load Contacts</h2>
                    <p className="text-gray-600 mb-4">Please try again.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
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

                    {/* Bulk Actions */}
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
                        columns={contactColumns}
                        selectable={true}
                        selectedRows={selectedContacts}
                        onSelectRow={handleSelectContact}
                        onSelectAll={handleSelectAll}
                    />

                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage}
                        itemsPerPage={itemsPerPage} data={data} totalPages={totalPages} />)}

            </div>
        </div>
    );
}