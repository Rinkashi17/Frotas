export interface ServiceRule {
    id: number;
    name: string;
    description: string;
    interval_km: number | null;
    interval_days: number | null;
    interval_months: number | null;
    inspection_type: string | null;
    is_active: boolean;
}

export type ServiceRulePayload = {
    name: string;
    description: string;
    interval_km: number | null;
    interval_days: number | null;
    interval_months: number | null;
    inspection_type: string | null;
    is_active: boolean;
}