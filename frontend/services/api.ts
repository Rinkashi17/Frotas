import { VehiclePayload } from "@/types/dashboard";

const API_URL =
    typeof window === "undefined"
        ? process.env.INTERNAL_API_URL
        : process.env.NEXT_PUBLIC_API_URL;

console.log("API_URL =", API_URL);

export async function getDashboardSummary() {
    const response = await fetch(
        `${API_URL}/dashboard/summary`
    );

    if (!response.ok) {
        throw new Error("Erro ao buscar dashboard");
    }

    return response.json();
}

export async function getTopCostVehicles() {
    const response = await fetch(
        `${API_URL}/dashboard/top-cost-vehicles`
    );

    if (!response.ok) {
        throw new Error(
            "Erro ao buscar veículos"
        );
    }

    return response.json();
}

export async function getUpcomingInspections() {
    const response = await fetch(
        `${API_URL}/dashboard/upcoming-inspections`
    )

    return response.json()
}

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