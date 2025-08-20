import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { SimpleModal } from "@/components/ui/simple-modal";
import { EnumItem } from "@/lib/enumClass";

export type FieldTypeEmployee = {
  name: string;
  label: string;
  type?: "text" | "number" | "email" | "password" | "textarea" | "select" | "date";
  placeholder?: string;
  options?: EnumItem[];
  required?: boolean;
  defaultValue?: any;
};

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  fields: FieldTypeEmployee[];
  onSubmit: (data: any, setError: any) => void | Promise<void>;
  submitLabel?: string;
  cancelLabel?: string;
  defaultValues?: Record<string, any>;
}

export const FormModal = ({
  isOpen,
  onClose,
  title = "Form",
  fields,
  onSubmit,
  submitLabel = "Submit",
  cancelLabel = "Cancel",
  defaultValues = {},
}: FormModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues });

  // Reset form when modal opens with new defaultValues
  useEffect(() => {
    if (isOpen) {
      reset(defaultValues);
    }
  }, [isOpen, defaultValues, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const submitForm = async (data: any) => {
    try {
      await onSubmit(data, setError);
      handleClose();
    } catch (err) {
      // error handled inside onSubmit
    }
  };

  return (
    <SimpleModal isOpen={isOpen} onClose={handleClose} size={"5xl"}>
     
        {title && <h2 className="text-xl font-semibold">{title}</h2>}

        <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
            {fields.map((field) => (
              <div key={field.name} className="flex flex-col w-full">
                <label className="mb-1 font-medium">{field.label}</label>

                {field.type === "textarea" ? (
                  <textarea
                    {...register(field.name, { required: field.required })}
                    placeholder={field.placeholder}
                     className="border px-3 py-2 rounded w-full"
                    defaultValue={field.defaultValue}
                    disabled={isSubmitting}
                  />
                ) : field.type === "select" && field.options ? (
                  <select
                    {...register(field.name, { required: field.required })}
                    defaultValue={field.defaultValue || ""}
                    className="border px-3 py-2 rounded w-full"
                    disabled={isSubmitting}
                  >
                    <option value="">Pilih...</option>
                    {field.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type || "text"}
                    {...register(field.name, { required: field.required })}
                    placeholder={field.placeholder}
                    className="border px-3 py-2 rounded w-full"
                    defaultValue={field.defaultValue}
                    disabled={isSubmitting}
                  />
                )}

                {errors[field.name] && (
                  <span className="text-sm text-red-500">
                    {field.label} wajib diisi.
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              {cancelLabel}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Menyimpan..." : submitLabel}
            </Button>
          </div>
        </form>
   
    </SimpleModal>
  );
};
