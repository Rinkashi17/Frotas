import { API_URL } from "@/features/dashboard/api/dashboardApi";
import { MileagePayload } from "../types/mileages";

export async function getMileage(vehicle_id: number) {
    const response = await fetch(
        `${API_URL}/vehicles/${vehicle_id}/mileages`
    )

    return response.json()
}

export async function createMileage(data: MileagePayload, vehicle_id: number) {

    const response = await fetch(
        `${API_URL}/vehicles/${vehicle_id}/mileages`,
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

export async function deleteMileage(
    vehicle_id: number, mileage_id: number
) {
    const response = await fetch(
        `${API_URL}/vehicles/${vehicle_id}/mileages/${mileage_id}`,
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {
        throw new Error("Erro ao excluir");
    }
}

export async function updateMileage(
    vehicle_id: number,
    data: MileagePayload,
    mileage_id: number
) {
    const response = await fetch(
        `${API_URL}/vehicles/${vehicle_id}/mileages/${mileage_id}`,
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