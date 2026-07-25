"use client";

import { Mileage } from "../types/mileages";
import { useState } from "react";
import { MileageModal } from "./MileageModal";
import { createMileage, updateMileage, deleteMileage } from "../api/mileageApi";

type Props = {
    vehicle_id: number;
    initialMileage: Mileage[];
}

export function MileageList({
    initialMileage, vehicle_id
}: Props) {
    const [open, setOpen] = useState(false);
    const [loading] = useState(false);
    const [selectedMileage, setSelectedMileage] = useState<Mileage | undefined>(undefined);

    return (
        <div className="p-8">

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">
                    Quilometragem
                </h1>

                <button
                    disabled={loading}
                    onClick={() => {setOpen(true); setSelectedMileage(undefined)}}
                    className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition"
                >
                    + Criar Quilometragem
                </button>
            </div>

            <MileageModal
                vehicle_id={vehicle_id}
                open={open}
                mileage={selectedMileage}
                onClose={() => setOpen(false)}
                onSubmit={async (data) => {
                    try {

                        if (selectedMileage) {
                            await updateMileage(
                                selectedMileage.id,
                                data,
                                selectedMileage.vehicle_id
                            );
                        } else {
                            await createMileage(data, data.vehicle_id);
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
                                Quilometragem
                            </th>

                            <th className="px-4 py-3 text-left">
                                Registrado em
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
                        {initialMileage.map((mileage) => (
                            <tr
                                key={mileage.id}
                                className="border-b border-zinc-800 hover:bg-zinc-800 transition"
                            >
                                <td className="px-4 py-3">
                                    <span className="px-2 py-1 rounded bg-green-500/20 text-green-400">
                                        {mileage.km}
                                    </span>
                                </td>

                                <td className="px-4 py-3">
                                    {mileage.recorded_at}
                                </td>

                                <td className="px-4 py-3">
                                    {mileage.vehicle_id}
                                </td>

                                <td className="px-4 py-3 flex gap-2">
                                    <button
                                        disabled={loading}
                                        onClick={() => {
                                            setSelectedMileage(mileage);
                                            setOpen(true);
                                        }}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        disabled={loading}
                                        onClick={async () => {
                                            await deleteMileage(mileage.vehicle_id, mileage.id);
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

            {initialMileage.length === 0 && (
                <p className="text-zinc-500 mt-4">
                    Nenhuma quilometragem registrada.
                </p>
            )}
        </div>
    )
}