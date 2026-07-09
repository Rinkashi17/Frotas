import { z } from "zod";

export const mileageSchema = z.object({
    km: z
        .number()
        .min(1, "Valor inválido"),

    recorded_at: z
        .string()
        .date("Data inválida"),

    vehicle_id: z
        .number()
});

export type MileageFormData =
    z.infer<typeof mileageSchema>;