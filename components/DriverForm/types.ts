import { FieldErrors } from "react-hook-form";
import z from "zod";

import { driverFormSchema } from "./schemas";

export type DriverFormSchemaProps = z.infer<typeof driverFormSchema>;

export type DriverFormProps = {
  title: string;
  onSuccess: (data: DriverFormSchemaProps) => void;
  defaultValues?: DriverFormSchemaProps;
  onError?: (errors: FieldErrors<DriverFormSchemaProps>) => void;
};
