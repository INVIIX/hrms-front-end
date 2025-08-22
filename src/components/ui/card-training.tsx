import {
  Eye,
  Download,
  Trash2,
  Upload,
  FileText,
  GrabIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TfieldTrainings } from "@/modules/employee-data/model/employee-model";

interface TrainingProps {
  training: TfieldTrainings[];
  onAdd?: () => void;
  onEdit?: (index: number) => void;
}

export const TrainingCard: React.FC<TrainingProps> = ({ training }) => {
  // const uploaded = !!fileName;
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };
  return (
    <div className="w-full rounded-lg bg-white flex flex-col divide-y">
      {training.map((item, index) => (
        <div key={index} className="flex items-start gap-4 py-3">
          {/* Icon */}
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 shrink-0">
            <FileText className="h-5 w-5 text-blue-500" />
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col">
            <h3 className="text-sm font-semibold text-gray-900">
              {item.training_name}
            </h3>
            {item.training_name && (
              <p className="text-xs text-muted-foreground">
                Issued: {item.training_start_date}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                "Completed"
              )}`}
            >
              {"Completed"}
            </span>
            <Button  size="sm" className="gap-2">
              <GrabIcon className="h-4 w-4" />
              Claim
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
