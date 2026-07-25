export interface Vehicle {
    id: number;
    plate: string;
    brand: string
    model: string;
    year: number;
    current_km: number;
    status?: string;
}

export type VehiclePayload = {
    plate: string;
    brand: string;
    model: string;
    year: number;
    current_km: number;
    status?: string;
};