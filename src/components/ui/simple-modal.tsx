import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface SimpleModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    className?: string;
}

export const SimpleModal = ({
    isOpen,
    onClose,
    children,
    className = "",
}: SimpleModalProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className={`relative bg-white rounded-md shadow-md w-full max-w-lg p-6 ${className}`}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
                >
                    ×
                </button>

                {children}
            </div>
        </div>,
        document.body
    );
};
