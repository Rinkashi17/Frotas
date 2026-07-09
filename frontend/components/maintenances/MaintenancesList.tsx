"use client";

import { Maintenances } from "@/types/dashboard"

// import { Vehicle } from "@/types/dashboard";
import { useState } from "react";
import { MaintenanceModal } from "./MaintenancesModal";
import { createMaintenances, updateMaintenances, deleteMaintenances } from "@/services/maintenances";

type Props = {
    vehicle_id: number;
    initialMaintenances: Maintenances[];
}

export function MaintenancesList({
    initialMaintenances, vehicle_id
}: Props) {
    const [open, setOpen] = useState(false);
    const [loading] = useState(false);
    const [selectedMaintenance, setSelectedMaintenance] = useState<Maintenances | undefined>(undefined);

    return (
        <div className="p-8">

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">
                    Manutenções
                </h1>

                <button
                    disabled={loading}
                    onClick={() => {setOpen(true); setSelectedMaintenance(undefined)}}
                    className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition"
                >
                    + Criar Manutenção
                </button>
            </div>

            <MaintenanceModal
                vehicle_id={vehicle_id}
                open={open}
                maintenances={selectedMaintenance}
                onClose={() => setOpen(false)}
                onSubmit={async (data) => {
                    try {

                        if (selectedMaintenance) {
                            await updateMaintenances(
                                selectedMaintenance.id,
                                data,
                                selectedMaintenance.vehicle_id
                            );
                        } else {
                            await createMaintenances(data, data.vehicle_id);
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
                                Preço
                            </th>

                            <th className="px-4 py-3 text-left">
                                Quilometragem
                            </th>

                            <th className="px-4 py-3 text-left">
                                Descrição
                            </th>

                            <th className="px-4 py-3 text-left">
                                Data da Manutenção
                            </th>

                            <th className="px-4 py-3 text-left">
                                Veículo
                            </th>

                            <th className="px-4 py-3 text-left">
                                Ações
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {initialMaintenances.map((maintenances) => (
                            <tr
                                key={maintenances.id}
                                className="border-b border-zinc-800 hover:bg-zinc-800 transition"
                            >
                                <td className="px-4 py-3">
                                    <span className="px-2 py-1 rounded bg-green-500/20 text-green-400">
                                        {maintenances.cost}
                                    </span>
                                </td>

                                <td className="px-4 py-3">
                                    {maintenances.km_at_service}
                                </td>

                                <td className="px-4 py-3">
                                    {maintenances.description}
                                </td>

                                <td className="px-4 py-3">
                                    {maintenances.maintenance_date}
                                </td>

                                <td className="px-4 py-3">
                                    {maintenances.vehicle_id}
                                </td>

                                <td className="px-4 py-3 flex gap-2">
                                    <button
                                        disabled={loading}
                                        onClick={() => {
                                            setSelectedMaintenance(maintenances);
                                            setOpen(true);
                                        }}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        disabled={loading}
                                        onClick={async () => {
                                            await deleteMaintenances(maintenances.vehicle_id, maintenances.id);
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

            {initialMaintenances.length === 0 && (
                <p className="text-zinc-500 mt-4">
                    Nenhum veículo encontrado.
                </p>
            )}
        </div>
    )
}