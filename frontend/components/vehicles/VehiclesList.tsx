"use client";

import { Vehicle } from "@/types/dashboard";
import { useState } from "react";
import { VehicleModal } from "./VehicleModal";
import { createVehicle, deleteVehicle, updateVehicle } from "@/services/api";

type Props = {
    initialVehicles: Vehicle[];
}

export function VehicleList({
    initialVehicles
}: Props) {
    const [open, setOpen] = useState(false);
    const [loading] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | undefined>(undefined);

    return (
        <div className="p-8">

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">
                    Veículos
                </h1>

                <button
                    disabled={loading}
                    onClick={() => {setOpen(true); setSelectedVehicle(undefined)}}
                    className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition"
                >
                    + Adicionar Veículo
                </button>
            </div>

            <VehicleModal
                open={open}
                vehicle={selectedVehicle}
                onClose={() => setOpen(false)}
                onSubmit={async (data) => {
                    try {

                        if (selectedVehicle) {
                            await updateVehicle(
                                selectedVehicle.id,
                                data
                            );
                        } else {
                            await createVehicle(data);
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
                                Status
                            </th>

                            <th className="px-4 py-3 text-left">
                                Placa
                            </th>

                            <th className="px-4 py-3 text-left">
                                Marca
                            </th>

                            <th className="px-4 py-3 text-left">
                                Modelo
                            </th>

                            <th className="px-4 py-3 text-left">
                                Km Atual
                            </th>

                            <th className="px-4 py-3 text-left">
                                Ações
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {initialVehicles.map((vehicle) => (
                            <tr
                                key={vehicle.id}
                                className="border-b border-zinc-800 hover:bg-zinc-800 transition"
                            >
                                <td className="px-4 py-3">
                                    <span className="px-2 py-1 rounded bg-green-500/20 text-green-400">
                                        {vehicle.status}
                                    </span>
                                </td>

                                <td className="px-4 py-3">
                                    {vehicle.plate}
                                </td>

                                <td className="px-4 py-3">
                                    {vehicle.brand}
                                </td>

                                <td className="px-4 py-3">
                                    {vehicle.model}
                                </td>

                                <td className="px-4 py-3">
                                    {vehicle.current_km}
                                </td>

                                <td className="px-4 py-3 flex gap-2">
                                    <button
                                        disabled={loading}
                                        onClick={() => {
                                            setSelectedVehicle(vehicle);
                                            setOpen(true);
                                        }}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        disabled={loading}
                                        onClick={async () => {
                                            await deleteVehicle(vehicle.id);
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

            {initialVehicles.length === 0 && (
                <p className="text-zinc-500 mt-4">
                    Nenhum veículo encontrado.
                </p>
            )}
        </div>
    )
}