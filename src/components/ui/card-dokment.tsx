import { Eye, Download, Trash2, Upload, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

type DocumentCardProps = {
  title: string;
  description?: string;
  fileName?: string;
  fileSize?: string;
  uploadedAt?: string;
  showActions?: boolean;
};

export const DocumentCard: React.FC<DocumentCardProps> = ({
  title,
  description,
  fileName,
  fileSize,
  uploadedAt,
  showActions = true,
}) => {
  const uploaded = !!fileName;

  return (
    <div className="w-full rounded-lg bg-white flex gap-4 space-y-4">
      {/* Icon */}
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-50">
        <FileText className="h-5 w-5 text-blue-500" />
      </div>

      <div className="flex justify-between w-full">
        <div className="flex flex-col">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
          <div>
            {uploaded ? (
              <div className="flex flex-col text-xs text-gray-600">
                <span className="font-medium">
                  {fileName}
                  {fileSize} • {uploadedAt}
                </span>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">
                Upload your {title}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-end">
          {uploaded ? (
            <div className="flex gap-1">
              <Button variant="ghost" size="icon">
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Download className="h-4 w-4" />
              </Button>
              {showActions && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ) : (
            <Button variant="outline" size="sm" className="gap-2">
              <Upload className="h-4 w-4" />
              Upload file
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
