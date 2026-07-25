import { API_URL } from "@/features/dashboard/api/dashboardApi";
import { InspectionPayload } from "../types/inspectionsApi";

export async function getInspections(vehicle_id: number) {
    const response = await fetch(
        `${API_URL}/vehicles/${vehicle_id}/inspections`
    )

    return response.json()
}

export async function createInspection(data: InspectionPayload, vehicle_id: number) {

    const response = await fetch(
        `${API_URL}/vehicles/${vehicle_id}/inspections`,
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

export async function deleteInspection(
    vehicle_id: number, inspection_id: number
) {
    const response = await fetch(
        `${API_URL}/vehicles/${vehicle_id}/inspections/${inspection_id}`,
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {
        throw new Error("Erro ao excluir");
    }
}

export async function updateInspection(
    vehicle_id: number,
    data: InspectionPayload,
    inspection_id: number
) {
    const response = await fetch(
        `${API_URL}/vehicles/${vehicle_id}/inspections/${inspection_id}`,
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