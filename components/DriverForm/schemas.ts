import { z } from "zod";

export const driverFormSchema = z.object({
  id: z.string(),
  name: z
    .string({ required_error: "Campo obrigatório" })
    .min(1, { message: "Campo obrigatório" }),
  document: z
    .string({ required_error: "Campo obrigatório" })
    .min(1, { message: "Campo obrigatório" }),
  vehicles: z.array(
    z.object({
      id: z
        .string({ required_error: "Campo obrigatório" })
        .min(1, { message: "Campo obrigatório" }),
      brand: z
        .string({ required_error: "Campo obrigatório" })
        .min(1, { message: "Campo obrigatório" }),
      plate: z
        .string({ required_error: "Campo obrigatório" })
        .min(1, { message: "Campo obrigatório" }),
    })
  ),
});
