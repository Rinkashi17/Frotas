import { z } from "zod";

export const inspectionSchema = z.object({
    description: z
        .string()
        .min(7, "Descrição inválida"),

    inspection_date: z
        .string()
        .date("Data inválida"),

    km_at_inspection: z
        .number()
        .min(1, "Valor inválido"),

    vehicle_id: z
        .number(),

    inspection_type: z
        .string()
        .date("Tipo inválido inválida"),

    expiration_date: z
        .string()
        .date("Data inválida"),

    status: z
        .string()
        .min(3, "Status inválida"),

    notes: z
        .string()
        .min(2, "Nota inválida"),
});

export type InspectionFormData =
    z.infer<typeof inspectionSchema>;