export interface DashboardSummary {
    total_vehicles: number;
    active_vehicles: number;
    total_maintenances: number;
}

export interface TopCostVehicle {
    plate: string;
    brand: string;
    model: string;
    total_cost: number;
}

export interface UpcomingInspections {
    total_upcoming_inspections: number
}