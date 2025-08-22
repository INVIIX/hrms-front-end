import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AxiosError } from "axios";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient";

type SalaryItem = {
  employee_id: number;
  salary_component_id: number;
  amount: number;
};

interface SalaryProps {
  salary_components: SalaryItem[];
  employee_id : string
}

const SalaryCard: React.FC<SalaryProps> = ({ salary_components ,employee_id}) => {
  const [salaries, setSalaries] = useState<SalaryItem[]>(salary_components);

  const [batchForm, setBatchForm] = useState<SalaryItem[]>([
    { employee_id: 0, salary_component_id: 0, amount: 0 },
  ]);

  // Tambah baris form baru
  const addFormRow = () => {
    setBatchForm([
      ...batchForm,
      { employee_id: 0, salary_component_id: 0, amount: 0 },
    ]);
  };

  // Update field di baris tertentu
  const updateFormRow = (
    index: number,
    field: keyof SalaryItem,
    value: number
  ) => {
    const newForm = [...batchForm];
    newForm[index][field] = value;
    setBatchForm(newForm);
  };

  // Simpan batch ke daftar salaries
  const handleSaveBatch = async () => {
    const method = "POST";
    const validData = batchForm.filter(
      (item) => item.salary_component_id && item.amount
    );
    if (validData.length) {
      setSalaries([...salaries, ...validData]);
      setBatchForm([{ employee_id: 0, salary_component_id: 0, amount: 0 }]);
    }
    console.log(batchForm)

    try {
      apiClient({
        method,
        url: `employees/${employee_id}/salary-components/batch`,
        batchForm,
      });
      toast.success("Create Success")
    } catch (err) {
      const error = err as AxiosError;
      toast.error(error.message);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg rounded-2xl">
      <CardHeader>
        <h2 className="text-lg font-bold">Salary Data</h2>
      </CardHeader>
      <CardContent>
        {/* List Salary */}
        <div className="space-y-3">
          {salaries.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center rounded-lg border p-3"
            >
              <p className="text-sm">
                <span className="font-medium">Component ID:</span>{" "}
                {item.salary_component_id}
              </p>
              <p className="font-semibold text-blue-600">
                Rp {item.amount.toLocaleString("id-ID")}
              </p>
            </div>
          ))}
        </div>

        {/* Tambah Data Batch */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-4 w-full">+ Add Batch Salary</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add Salary (Batch)</DialogTitle>
            </DialogHeader>

            <div className="space-y-3">
              {batchForm.map((row, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 border p-2 rounded-lg"
                >
                  <Input
                    type="number"
                    placeholder="Employee ID"
                    value={row.employee_id || ""}
                    onChange={(e) =>
                      updateFormRow(
                        index,
                        "employee_id",
                        Number(e.target.value)
                      )
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Salary Component ID"
                    value={row.salary_component_id || ""}
                    onChange={(e) =>
                      updateFormRow(
                        index,
                        "salary_component_id",
                        Number(e.target.value)
                      )
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Amount"
                    value={row.amount || ""}
                    onChange={(e) =>
                      updateFormRow(index, "amount", Number(e.target.value))
                    }
                  />
                </div>
              ))}

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={addFormRow}
                >
                  + Add Row
                </Button>
                <Button
                  type="button"
                  className="flex-1"
                  onClick={handleSaveBatch}
                >
                  Save Batch
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default SalaryCard;
