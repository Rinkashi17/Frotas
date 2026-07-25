export interface Mileage {
    id: number;
    vehicle_id: number;
    km: number;
    recorded_at: string;
}

export type MileagePayload = {
    vehicle_id: number;
    km: number;
    recorded_at: string;
}