"use client";

import { ServiceRule } from "../types/servicesrules"

import { useState } from "react";
import { ServiceRuleModal } from "./ServiceRuleModal";
import { createServicesRules, updateServicesRules, deleteServicesRules } from "../api/serviceruleApi";

type Props = {
    serviceRules: ServiceRule[];
}

export function ServiceRuleList({ serviceRules
}: Props) {
    const [open, setOpen] = useState(false);
    const [loading] = useState(false);
    const [selectedServiceRule, setSelectedServiceRule] = useState<ServiceRule | undefined>(undefined);

    return (
        <div className="p-8">

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">
                    Regras
                </h1>

                <button
                    disabled={loading}
                    onClick={() => {setOpen(true); setSelectedServiceRule(undefined)}}
                    className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition"
                >
                    + Criar Regra
                </button>
            </div>

            <ServiceRuleModal
                open={open}
                serviceRule={selectedServiceRule}
                onClose={() => setOpen(false)}
                onSubmit={async (data) => {
                    try {

                        if (selectedServiceRule) {
                            await updateServicesRules(
                                selectedServiceRule.id,
                                data
                            );
                        } else {
                            await createServicesRules(data);
                        }

                        setOpen(false);
                        window.location.reload();

                    } catch (error) {
                        console.error(error);
                    }
                }}
            />

            <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-zinc-800">
                        <tr>
                            <th className="px-4 py-3 text-left">
                                Nome
                            </th>

                            <th className="px-4 py-3 text-left">
                                Descrição
                            </th>

                            <th className="px-4 py-3 text-left">
                                Intervalo de km
                            </th>

                            <th className="px-4 py-3 text-left">
                                Intervalo de dias
                            </th>

                            <th className="px-4 py-3 text-left">
                                Intervalo de meses
                            </th>

                            <th className="px-4 py-3 text-left">
                                Tipo de inspeção
                            </th>

                            <th className="px-4 py-3 text-left">
                                Ativo
                            </th>

                            <th className="px-4 py-3 text-left">
                                Ações
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {serviceRules.map((serviceRule) => (
                            <tr
                                key={serviceRule.id}
                                className="border-b border-zinc-800 hover:bg-zinc-800 transition"
                            >
                                <td className="px-4 py-3">
                                    <span className="px-2 py-1 rounded bg-green-500/20 text-green-400">
                                        {serviceRule.name}
                                    </span>
                                </td>

                                <td className="px-4 py-3">
                                    {serviceRule.description}
                                </td>

                                <td className="px-4 py-3">
                                    {serviceRule.interval_km 
                                        ? `${serviceRule.interval_km} km`
                                        : "Sem intervalo"
                                    }
                                </td>

                                <td className="px-4 py-3">
                                    {serviceRule.interval_days 
                                        ? `${serviceRule.interval_days} Dias`
                                        : "Sem intervalo"
                                    }
                                </td>

                                <td className="px-4 py-3">
                                    {serviceRule.interval_months 
                                        ? `${serviceRule.interval_months} Meses`
                                        : "Sem intervalo"
                                    }
                                </td>

                                <td className="px-4 py-3">
                                    {serviceRule.inspection_type}
                                </td>

                                <td className="px-4 py-3">
                                    {serviceRule.is_active}
                                </td>

                                <td className="px-4 py-3 flex gap-2">
                                    <button
                                        disabled={loading}
                                        onClick={() => {
                                            setSelectedServiceRule(serviceRule);
                                            setOpen(true);
                                        }}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        disabled={loading}
                                        onClick={async () => {
                                            await deleteServicesRules(serviceRule.id);
                                            window.location.reload();
                                        }}
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {serviceRules.length === 0 && (
                <p className="text-zinc-500 mt-4">
                    Nenhuma Regra registrada.
                </p>
            )}
        </div>
    )
}