import { z } from "zod";

export const maintenanceSchema = z.object({
    cost: z
        .number()
        .min(1, "Valor inválido"),

    km_at_service: z
        .number()
        .min(2, "Quilometragem obrigatória"),

    description: z
        .string()
        .min(2, "Descrição obrigatória"),

    maintenance_date: z
        .string()
        .date("Data inválida"),

    vehicle_id: z
        .number()
});

export type MaintenanceFormData =
    z.infer<typeof maintenanceSchema>;