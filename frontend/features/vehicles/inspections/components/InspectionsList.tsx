"use client";

import { Inspection } from "../types/inspectionsApi"
import { useState } from "react";
import { InspectionModal } from "./InspectionsModal";
import { createInspection, updateInspection, deleteInspection } from "../api/inspectionsApi";

type Props = {
    vehicle_id: number;
    initialInspection: Inspection[];
}

export function InspectionsList({
    initialInspection, vehicle_id
}: Props) {
    const [open, setOpen] = useState(false);
    const [loading] = useState(false);
    const [selectedInspection, setSelectedInspection] = useState<Inspection | undefined>(undefined);

    return (
        <div className="p-8">

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">
                    Inspeções
                </h1>

                <button
                    disabled={loading}
                    onClick={() => {setOpen(true); setSelectedInspection(undefined)}}
                    className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition"
                >
                    + Criar Inspeções
                </button>
            </div>

            <InspectionModal
                vehicle_id={vehicle_id}
                open={open}
                inspection={selectedInspection}
                onClose={() => setOpen(false)}
                onSubmit={async (data) => {
                    try {

                        if (selectedInspection) {
                            await updateInspection(
                                selectedInspection.id,
                                data,
                                selectedInspection.vehicle_id
                            );
                        } else {
                            await createInspection(data, data.vehicle_id);
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
                                Descrição
                            </th>

                            <th className="px-4 py-3 text-left">
                                Data de Inspeção
                            </th>

                            <th className="px-4 py-3 text-left">
                                Veículo
                            </th>

                            <th className="px-4 py-3 text-left">
                                Tipo de Inspeção
                            </th>

                            <th className="px-4 py-3 text-left">
                                Data de Expiração
                            </th>

                            <th className="px-4 py-3 text-left">
                                Status
                            </th>

                            <th className="px-4 py-3 text-left">
                                Notas
                            </th>

                            <th className="px-4 py-3 text-left">
                                Ações
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {initialInspection.map((inspection) => (
                            <tr
                                key={inspection.id}
                                className="border-b border-zinc-800 hover:bg-zinc-800 transition"
                            >
                                <td className="px-4 py-3">
                                    <span className="px-2 py-1 rounded bg-green-500/20 text-green-400">
                                        {inspection.description}
                                    </span>
                                </td>

                                <td className="px-4 py-3">
                                    {inspection.inspection_date}
                                </td>

                                <td className="px-4 py-3">
                                    {inspection.km_at_inspection}
                                </td>

                                <td className="px-4 py-3">
                                    {inspection.vehicle_id}
                                </td>

                                <td className="px-4 py-3">
                                    {inspection.inspection_type}
                                </td>

                                <td className="px-4 py-3">
                                    {inspection.expiration_date}
                                </td>

                                <td className="px-4 py-3">
                                    {inspection.status}
                                </td>

                                <td className="px-4 py-3">
                                    {inspection.notes}
                                </td>

                                <td className="px-4 py-3 flex gap-2">
                                    <button
                                        disabled={loading}
                                        onClick={() => {
                                            setSelectedInspection(inspection);
                                            setOpen(true);
                                        }}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        disabled={loading}
                                        onClick={async () => {
                                            await deleteInspection(inspection.vehicle_id, inspection.id);
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

            {initialInspection.length === 0 && (
                <p className="text-zinc-500 mt-4">
                    Nenhuma inspeção encontrada.
                </p>
            )}
        </div>
    )
}