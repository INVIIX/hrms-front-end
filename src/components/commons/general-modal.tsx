import { ReactNode } from "react";

export type GeneralModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  desc?: string;
  children?: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
};

export default function GeneralModal({
  isOpen,
  onClose,
  title,
  desc,
  children,
  footer,
  size = "md",
}: GeneralModalProps) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    full: "max-w-[90%]",
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className={`bg-white rounded-lg shadow-lg w-full ${sizeClasses[size]}`}
      >
        {title && (
          <div className="border-b dark:border-gray-200 px-4 py-2 text-lg font-semibold flex justify-between items-center">
            <div className="flex flex-col dark:text-gray-800">
              <span>{title}</span>
              <span className="font-medium text-sm text-gray-600">{desc}</span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black"
            >
              ✕
            </button>
          </div>
        )}

        <div className="p-1">
          {children}
          </div>

        {footer && (
          <div className="px-4 flex justify-end gap-2 mb-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
