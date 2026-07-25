export const API_URL =
    typeof window === "undefined"
        ? process.env.INTERNAL_API_URL
        : process.env.NEXT_PUBLIC_API_URL;

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