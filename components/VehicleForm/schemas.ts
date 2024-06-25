import { z } from "zod";

export const vehicleFormSchema = z.object({
  id: z.string(),
  brand: z
    .string({ required_error: "Campo obrigatório" })
    .min(1, { message: "Campo obrigatório" }),
  plate: z
    .string({ required_error: "Campo obrigatório" })
    .min(1, { message: "Campo obrigatório" }),
});
