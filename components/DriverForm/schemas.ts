import { z } from "zod";

export const driverFormSchema = z.object({
  id: z.string().optional(),
  name: z
    .string({ required_error: "Campo obrigatório" })
    .min(1, { message: "Campo obrigatório" }),
  document: z
    .string({ required_error: "Campo obrigatório" })
    .min(1, { message: "Campo obrigatório" }),
  vehicle: z
    .object({
      id: z.string({ required_error: "Campo obrigatório" }),
      brand: z.string({ required_error: "Campo obrigatório" }),
      plate: z.string({ required_error: "Campo obrigatório" }),
    })
    .optional(),
});
