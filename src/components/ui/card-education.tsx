import React from "react";
import { Pencil, Plus, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TfieldEducation } from "@/modules/employee-data/model/employee-model";


interface EducationHistoryProps {
  education: TfieldEducation[];
  onAdd?: () => void;
  onEdit?: (data: TfieldEducation) => void;
}

export const EducationHistory: React.FC<EducationHistoryProps> = ({
  education,
  onAdd,
  onEdit,
}) => {
  return (
    <Card className="p-4 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-gray-700" />
            <CardTitle className="text-lg font-semibold">
              Education history
            </CardTitle>
          </div>
          <p className="text-sm text-gray-500">Educational journey record</p>
        </div>
        <Button
          onClick={onAdd}
          className="flex items-center gap-1 bg-gray-800 text-white hover:bg-gray-700"
        >
          <Plus className="w-4 h-4" /> Add Education
        </Button>
      </CardHeader>

      <CardContent className="space-y-6">
        {education.map((item, index) => (
          <div key={index} className="relative">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-base font-semibold">{item.institution_name}</h2>
                <p className="text-sm text-gray-600">
                  {item.major} &nbsp; {item.degree}
                </p>

                <p className="text-sm text-gray-600">
                  {item.enrollment_year} -&nbsp; {item.graduation_year}
                </p>
                
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit?.(item)}
              >
                <Pencil className="w-4 h-4 mr-1" /> Edit
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
