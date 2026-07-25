"use client"

import { Mileage, MileagePayload } from "../types/mileages";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    mileageSchema, MileageFormData
} from "@/app/schemas/mileage";

type Props = {
    mileage?: Mileage;
    vehicle_id?: number;
    onSubmit: (data: MileagePayload) => void;
};

export function MileageForm({
    mileage,
    onSubmit,
    vehicle_id
}: Props) {

    const submitForm = (
        data: MileageFormData
    ) => {
        console.log(data);

        onSubmit(data);
    };

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<MileageFormData>({
        resolver: zodResolver(mileageSchema),

        defaultValues: {
            km: mileage?.km || 0 ,
            recorded_at: mileage?.recorded_at || "",
            vehicle_id: vehicle_id
        }
    });


    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="km">
                    Quilometragem
                </label>
                <input
                    id="km"
                    type="number"
                    {...register("km", {
                        valueAsNumber: true
                    })}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                />
                {errors.km && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.km.message}
                    </p>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="recorded_at">
                    Data
                </label>
                <input
                    id="recorded_at"
                    type="number"
                    {...register("recorded_at", {
                        valueAsNumber: true
                    })}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                />
                {errors.recorded_at && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.recorded_at.message}
                    </p>
                )}
            </div>
            <button
                type="submit"
                className="w-full mt-6 px-4 py-2 rounded-lg bg-zinc-100 text-black hover:bg-zinc-300 transition"
            >
                Salvar Quilometragem
            </button>
        </form>
    )
}