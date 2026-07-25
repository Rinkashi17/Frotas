export interface Inspection {
    id: number;
    description: string;
    inspection_date: string;
    km_at_inspection: number;
    vehicle_id: number;
    inspection_type: string;
    expiration_date: string;
    status: string;
    notes: string;
}

export type InspectionPayload = {
    description: string;
    inspection_date: string;
    km_at_inspection: number;
    vehicle_id: number;
    inspection_type: string;
    expiration_date: string;
    status: string;
    notes: string;
}