"use client"

import { Inspection, InspectionPayload } from "../types/inspectionsApi";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    inspectionSchema, InspectionFormData
} from "@/app/schemas/inspections";

type Props = {
    inspection?: Inspection;
    vehicle_id?: number;
    onSubmit: (data: InspectionPayload) => void;
};

export function InspectionsForm({
    inspection,
    onSubmit,
    vehicle_id
}: Props) {

    const submitForm = (
        data: InspectionFormData
    ) => {
        console.log(data);

        onSubmit(data);
    };

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<InspectionFormData>({
        resolver: zodResolver(inspectionSchema),

        defaultValues: {
            description: inspection?.description || "" ,
            inspection_date: inspection?.inspection_date || "",
            km_at_inspection: inspection?.km_at_inspection || 0,
            vehicle_id: vehicle_id,
            inspection_type: inspection?.inspection_type || "",
            expiration_date: inspection?.expiration_date || "",
            status: inspection?.status || "",
            notes: inspection?.notes || "",
        }
    });


    return (
        <form onSubmit={handleSubmit(submitForm)}>
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
                <label className="block text-sm font-bold mb-2" htmlFor="inspection_date">
                    Data de manutenção
                </label>
                <input
                    id="inspection_date"
                    type="date"
                    {...register("inspection_date")}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                />
                {errors.inspection_date && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.inspection_date.message}
                    </p>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="km_at_inspection">
                    Quilometragem até Inspeção
                </label>
                <input
                    id="km_at_inspection"
                    type="number"
                    {...register("km_at_inspection", {
                        valueAsNumber: true
                    })}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                />
                {errors.km_at_inspection && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.km_at_inspection.message}
                    </p>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="inspection_type">
                    Tipo de Inspeção
                </label>
                <input
                    id="inspection_type"
                    type="text"
                    {...register("inspection_type")}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                />
                {errors.inspection_type && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.inspection_type.message}
                    </p>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="expiration_date">
                    Data de Expiração
                </label>
                <input
                    id="expiration_date"
                    type="date"
                    {...register("expiration_date")}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                />
                {errors.expiration_date && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.expiration_date.message}
                    </p>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="status">
                    Status
                </label>
                <input
                    id="status"
                    type="text"
                    {...register("status")}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                />
                {errors.status && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.status.message}
                    </p>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="notes">
                    Notas
                </label>
                <input
                    id="notes"
                    type="text"
                    {...register("notes")}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                />
                {errors.notes && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.notes.message}
                    </p>
                )}
            </div>
            <button
                type="submit"
                className="w-full mt-6 px-4 py-2 rounded-lg bg-zinc-100 text-black hover:bg-zinc-300 transition"
            >
                Salvar Inspeção
            </button>
        </form>
    )
}