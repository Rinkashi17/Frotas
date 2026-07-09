"use client"

import { Maintenances, MaintenancePayload } from "@/types/dashboard";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    maintenanceSchema, MaintenanceFormData
} from "@/app/schemas/maintenances";

type Props = {
    maintenance?: Maintenances;
    vehicle_id?: number;
    onSubmit: (data: MaintenancePayload) => void;
};

export function MaintenanceForm({
    maintenance,
    onSubmit,
    vehicle_id
}: Props) {

    const submitForm = (
        data: MaintenanceFormData
    ) => {
        console.log(data);

        onSubmit(data);
    };

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<MaintenanceFormData>({
        resolver: zodResolver(maintenanceSchema),

        defaultValues: {
            cost: maintenance?.cost || 0,
            km_at_service: maintenance?.km_at_service || 0 ,
            description: maintenance?.description || "",
            maintenance_date: maintenance?.maintenance_date || undefined,
            vehicle_id: vehicle_id
        }
    });


    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="cost">
                    Preço
                </label>
                <input
                    id="cost"
                    type="number"
                    {...register("cost", {
                        valueAsNumber: true
                    })}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                />
                {errors.cost && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.cost.message}
                    </p>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="km_at_service">
                    Quilometragem Atual
                </label>
                <input
                    id="km_at_service"
                    type="number"
                    {...register("km_at_service", {
                        valueAsNumber: true
                    })}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                />
                {errors.km_at_service && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.km_at_service.message}
                    </p>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="description">
                    Descrição
                </label>
                <input
                    id="description"
                    type="text"
                    {...register("description")}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                />
                {errors.description && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.description.message}
                    </p>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="maintenance_date">
                    Data de manutenção
                </label>
                <input
                    id="maintenance_date"
                    type="date"
                    {...register("maintenance_date")}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                />
                {errors.maintenance_date && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.maintenance_date.message}
                    </p>
                )}
            </div>
            <button
                type="submit"
                className="w-full mt-6 px-4 py-2 rounded-lg bg-zinc-100 text-black hover:bg-zinc-300 transition"
            >
                Salvar Manutenção
            </button>
        </form>
    )
}