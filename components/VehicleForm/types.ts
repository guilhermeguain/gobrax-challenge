import { FieldErrors } from "react-hook-form";
import z from "zod";

import { vehicleFormSchema } from "./schemas";

export type VehicleFormSchemaProps = z.infer<typeof vehicleFormSchema>;

export type VehicleFormProps = {
  title: string;
  onSuccess: (data: VehicleFormSchemaProps) => void;
  defaultValues?: VehicleFormSchemaProps;
  onError?: (errors: FieldErrors<VehicleFormSchemaProps>) => void;
};
