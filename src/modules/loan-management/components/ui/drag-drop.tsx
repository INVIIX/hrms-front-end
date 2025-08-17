  import React, { useState, DragEvent, ChangeEvent } from "react";
  import { RiUploadCloud2Fill } from "react-icons/ri";
  import { FaFileCircleCheck } from "react-icons/fa6";

  interface DragAndDropUploadProps {
    onFileSelect?: (file: File) => void;
    supportedFormats?: string;
  }

  const DragAndDropUpload: React.FC<DragAndDropUploadProps> = ({
    onFileSelect,
    supportedFormats = ".xlsx, .csv",
  }) => {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragActive(true);
    };

    const handleDragLeave = () => {
      setDragActive(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        setSelectedFile(file);
        if (onFileSelect) onFileSelect(file);
      }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setSelectedFile(file);
        if (onFileSelect) onFileSelect(file);
      }
    };

    return (
      <div className="col-span-full border-2 border-dashed border-gray-300 rounded-lg p-4">
        <label className="block text-sm font-medium text-white">
          Cover photo
        </label>
        <div
          className={`mt-2 flex justify-center rounded-lg border border-dashed px-6 py-2 transition-colors ${
            dragActive ? "border-indigo-400 bg-indigo-50/10" : "border-white/25"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="text-center items-center flex flex-col">
            {selectedFile ? (
              <FaFileCircleCheck className="w-14 h-14 text-green-400" />
            ) : (
              <RiUploadCloud2Fill className="w-14 h-14 text-gray-300" />
            )}
            <div className="mt-4 flex text-sm text-gray-400">
              <p className="me-1">Drag and Drop Files or</p>
              <label className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-400 hover:text-indigo-300">
                <span>Browse</span>
                <input
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <p className="text-xs text-gray-400">
              Supported formats: {supportedFormats}
            </p>

            {selectedFile && (
              <p className="mt-2 text-sm text-green-400">
                File selected: {selectedFile.name}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  export default DragAndDropUpload;
