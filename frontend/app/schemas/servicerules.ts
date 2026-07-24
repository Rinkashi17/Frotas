import { z } from "zod";

export const serviceRuleSchema = z.object({
    name: z
        .string()
        .min(3, "Nome inválido"),

    description: z
        .string()
        .min(7, "Descrição inválida"),

        interval_km: z
        .number()
        .min(1,"Valor inválido")
        .nullable()
        .optional(),

    interval_days: z
        .number()
        .min(1, "Valor inválido")
        .nullable()
        .optional(),

    interval_months: z
        .number()
        .min(1, "Valor inválido")
        .nullable()
        .optional(),

    inspection_type: z
        .string()
        .min(3, "Tipo inválido"),

    is_active: z
        .boolean()
});

export type ServiceRuleFormData =
    z.infer<typeof serviceRuleSchema>;