import { API_URL } from "@/features/dashboard/api/dashboardApi";
import { MaintenancePayload } from "../types/maintenances";

export async function getMaintenances(vehicle_id: number) {
    const response = await fetch(
        `${API_URL}/vehicles/${vehicle_id}/maintenances`
    )

    return response.json()
}

export async function createMaintenances(data: MaintenancePayload, vehicle_id: number) {

    const response = await fetch(
        `${API_URL}/vehicles/${vehicle_id}/maintenances`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );

    if (!response.ok) {
        throw new Error("Erro ao criar Manutenção");
    }

    return response.json();
}

export async function deleteMaintenances(
    vehicle_id: number, maintenance_id: number
) {
    const response = await fetch(
        `${API_URL}/vehicles/${vehicle_id}/maintenances/${maintenance_id}`,
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {
        throw new Error("Erro ao excluir");
    }
}

export async function updateMaintenances(
    vehicle_id: number,
    data: MaintenancePayload,
    maintenance_id: number
) {
    const response = await fetch(
        `${API_URL}/vehicles/${vehicle_id}/maintenances/${maintenance_id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );

    if (!response.ok) {
        throw new Error("Erro ao atualizar");
    }

    return response.json();
}