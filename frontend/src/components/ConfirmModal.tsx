import React from "react";

interface ConfirmModalProps {
    open: boolean;
    title?: string;
    message?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    open,
    title = "Confirm Delete",
    message = "Are you sure you want to delete these contacts? This action cannot be undone.",
    onConfirm,
    onCancel
}) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">


            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
                <h2 className="text-lg font-semibold mb-2">{title}</h2>
                <p className="text-gray-600 mb-6">{message}</p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
