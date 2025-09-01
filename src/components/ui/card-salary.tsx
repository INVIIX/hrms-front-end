import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TfieldSalary } from "@/modules/employee-data/model/employee-model";

type SalaryItem = {
  salary_component_id: number;
  amount: number;
};

type salary_componentItem = {
  id: string,
  name: string,
  type: string,
  description: string
};

interface SalaryProps {
  salaries: TfieldSalary[]
  employee_id?: string;
}

const SalaryCard: React.FC<SalaryProps> = ({ salaries, employee_id }) => {
  const queryClient = useQueryClient();


  // Ambil data salary
  const { data: salary_componentItem = [], isLoading } = useQuery<salary_componentItem[]>({
    queryKey: ["salary_componentItem"],
    queryFn: async () => {
      const res = await apiClient.get(`salary-components`);
      return res.data.data || [];
    },
  });

  //  console.log(salary_componentItem)
  const [batchForm, setBatchForm] = useState<SalaryItem[]>([
    { salary_component_id: 0, amount: 0 },
  ]);

  // Tambah baris form baru
  const addFormRow = () => {
    setBatchForm([...batchForm, { salary_component_id: 0, amount: 0 }]);
    // console.log(salary_componentItem)
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

  // Hapus baris form tertentu
  const removeFormRow = (index: number) => {
    const newForm = batchForm.filter((_, i) => i !== index);
    setBatchForm(newForm.length ? newForm : [{ salary_component_id: 0, amount: 0 }]);
  };

  // Mutation untuk save batch
  const mutation = useMutation({
    mutationFn: async (payload: { salary_components: SalaryItem[] }) => {
      return apiClient.post(
        `employees/${employee_id}/salary-components/batch`,
        payload
      );
    },
    onSuccess: () => {
      toast.success("Create Success");
      // queryClient.invalidateQueries({ queryKey: ["salary-components", employee_id] });
      setBatchForm([{ salary_component_id: 0, amount: 0 }]);
    },
    onError: (err) => {
      const error = err as AxiosError;
      toast.error(error.message);
    },
  });

  const handleSaveBatch = () => {
    const validData = batchForm.filter(
      (item) => item.salary_component_id && item.amount
    );
    if (validData.length) {
      mutation.mutate({ salary_components: validData });
    } else {
      toast.error("Please fill all fields correctly");
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg rounded-2xl">
      <CardHeader>
        <h2 className="text-lg font-bold">Salary Data</h2>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-3">
            {salaries?.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center rounded-lg border p-3"
              >
                <p className="text-sm">
                  <span className="font-medium"></span>{" "}
                  {item.component.name}
                </p>
                <p className="font-semibold text-blue-600">
                  Rp {item.amount.toLocaleString("id-ID")}
                </p>
              </div>
            ))}
          </div>
        )}

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
                  <Select
                    onValueChange={(value) =>
                      updateFormRow(index, "salary_component_id", Number(value))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Component" />
                    </SelectTrigger>
                    <SelectContent>
                      {salary_componentItem.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          <div className="flex flex-col w-full py-1">
                            <span className="font-semibold text-gray-900">{item.name}</span>
                            <div className="flex justify-between text-xs text-gray-500">
                              <span>{item.type}</span>
                          
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    placeholder="Amount"
                    value={row.amount || ""}
                    onChange={(e) =>
                      updateFormRow(index, "amount", Number(e.target.value))
                    }
                  />
                  {batchForm.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => removeFormRow(index)}
                    >
                      X
                    </Button>
                  )}
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
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Saving..." : "Save Batch"}
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
