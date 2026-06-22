"use client"

import { Vehicle, VehiclePayload } from "@/types/dashboard";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    vehicleSchema,
    VehicleFormData
} from "@/app/schemas/vehicle";

type Props = {
    vehicle?: Vehicle;
    onSubmit: (data: VehiclePayload) => void;
};

export function VehicleForm({
    vehicle,
    onSubmit
}: Props) {

    const submitForm = (
        data: VehicleFormData
    ) => {
        console.log(data);

        onSubmit(data);
    };

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<VehicleFormData>({
        resolver: zodResolver(vehicleSchema),

        defaultValues: {
            plate: vehicle?.plate || "",
            brand: vehicle?.brand || "",
            model: vehicle?.model || "",
            year: vehicle?.year || undefined,
            current_km: vehicle?.current_km || 0
        }
    });


    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="plate">
                    Placa
                </label>
                <input
                    id="plate"
                    type="text"
                    {...register("plate")}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                />
                {errors.plate && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.plate.message}
                    </p>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="brand">
                    Marca
                </label>
                <input
                    id="brand"
                    type="text"
                    {...register("brand")}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                />
                {errors.brand && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.brand.message}
                    </p>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="model">
                    Modelo
                </label>
                <input
                    id="model"
                    type="text"
                    {...register("model")}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                />
                {errors.model && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.model.message}
                    </p>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="year">
                    Ano
                </label>
                <input
                    id="year"
                    type="number"
                    {...register("year", {
                        valueAsNumber: true
                    })}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                />
                {errors.year && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.year.message}
                    </p>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="km">
                    Km Atual
                </label>
                <input
                    id="km"
                    type="number"
                    {...register("current_km", {
                        valueAsNumber: true
                    })}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                />
                {errors.current_km && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.current_km.message}
                    </p>
                )}
            </div>
            <button
                type="submit"
                className="w-full mt-6 px-4 py-2 rounded-lg bg-zinc-100 text-black hover:bg-zinc-300 transition"
            >
                Salvar Veículo
            </button>
        </form>
    )
}