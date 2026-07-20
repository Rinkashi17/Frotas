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