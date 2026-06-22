export interface DashboardSummary {
    total_vehicles: number;
    active_vehicles: number;
    total_maintenances: number;
}

export interface TopCostVehicle {
    plate: VehiclePayload['plate']
    brand: VehiclePayload['brand']
    model: VehiclePayload['model']
    total_cost: number;
}

export interface UpcomingInspections {
    total_upcoming_inspections: number
}

export interface Vehicle {
    id: number;
    plate: VehiclePayload['plate']
    brand: VehiclePayload['brand']
    model: VehiclePayload['model']
    year: VehiclePayload['year']
    current_km: VehiclePayload['current_km']
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