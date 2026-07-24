import { API_URL } from "./api";
import { ServiceRulePayload } from "@/types/dashboard";

export async function getServicesRules() {

    console.log("ENTROU NA PAGE")

    const response = await fetch(
        `${API_URL}/service-rules/`
    )

    console.log(response.status);

    return response.json()
}

export async function createServicesRules(data: ServiceRulePayload) {

    const response = await fetch(
        `${API_URL}/service-rules/`,
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

export async function deleteServicesRules(
    service_rule_id: number
) {
    const response = await fetch(
        `${API_URL}/service-rules/${service_rule_id}`,
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {
        throw new Error("Erro ao excluir");
    }
}

export async function updateServicesRules(
    service_rule_id: number,
    data: ServiceRulePayload,
) {
    const response = await fetch(
        `${API_URL}/service-rules/${service_rule_id}`,
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