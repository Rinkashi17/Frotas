export interface Maintenances {
    id: number;
    vehicle_id: number;
    cost: number;
    km_at_service: number;
    description: string;
    maintenance_date: string;
}

export type MaintenancePayload = {
    vehicle_id: number;
    cost: number;
    km_at_service: number;
    description: string;
    maintenance_date: string;
}