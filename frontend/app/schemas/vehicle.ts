import { z } from "zod";

export const vehicleSchema = z.object({
    plate: z
        .string()
        .min(7, "Placa inválida"),

    brand: z
        .string()
        .min(2, "Marca obrigatória"),

    model: z
        .string()
        .min(2, "Modelo obrigatório"),

    year: z
        .number()
        .min(1900)
        .max(new Date().getFullYear() + 1),

    current_km: z
        .number()
        .min(0)
});

export type VehicleFormData =
    z.infer<typeof vehicleSchema>;