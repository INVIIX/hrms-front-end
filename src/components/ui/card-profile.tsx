import React from "react";
import { Pencil, Plus, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TfieldEmployee } from "@/modules/employee-data/model/employee-model";


interface ProfileProps {
  employe?: TfieldEmployee ;
  onEdit?: (data: TfieldEmployee) => void;
}

export const Profile: React.FC<ProfileProps> = ({
  employe,
  onEdit,
}) => {
  return (
    <Card className="p-4">
      <CardHeader className="flex justify-between items-center mt-3">
        <CardTitle>Informasi Pribadi</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="https://robohash.org/mail@ashallendesign.co.uk"
              alt="profile"
              className="w-20 h-20 rounded-full"
            />
            <h2 className="font-semibold">{employe?.profile?.name}</h2>
          </div>
          <Button size="sm" variant="outline"
            onClick={() => onEdit?.(employe)}
          >Edit
          </Button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
          <div>
            <p className="font-medium">Email</p>
            <p className="text-gray-600">{employe?.email}</p>
          </div>
          <div>
            <p className="font-medium">No. Telp</p>
            <p className="text-gray-600">{employe?.phone}</p>
          </div>
          <div>
            <p className="font-medium">Alamat</p>
            <p className="text-gray-600">
              {employe?.profile?.legal_address}
            </p>
          </div>
          <div>
            <p className="font-medium">Agama</p>
            <p className="text-gray-600">{employe?.profile?.religion}</p>
          </div>
          <div>
            <p className="font-medium">Kewarganegaraan</p>
            <p className="text-gray-600">
              {employe?.profile?.citizenship}
            </p>
          </div>
          <div>
            <p className="font-medium">Status Pernikahan</p>
            <p className="text-gray-600">
              {employe?.profile?.marital_status}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
