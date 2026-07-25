import { API_URL } from "@/features/dashboard/api/dashboardApi";
import { VehiclePayload } from "../types/vehicles";

export async function getVehicles() {
    const response = await fetch(
        `${API_URL}/vehicles/`
    )

    return response.json()
}

export async function createVehicle(data: VehiclePayload) {
    console.log("Criando veículo em:", `${API_URL}/vehicles/`);

    const response = await fetch(
        `${API_URL}/vehicles/`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );

    if (!response.ok) {
        throw new Error("Erro ao criar veículo");
    }

    return response.json();
}

export async function deleteVehicle(
    id: number
) {
    const response = await fetch(
        `${API_URL}/vehicles/${id}`,
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {
        throw new Error("Erro ao excluir");
    }
}

export async function updateVehicle(
    id: number,
    data: VehiclePayload
) {
    const response = await fetch(
        `${API_URL}/vehicles/${id}`,
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