"use client"

import { ServiceRule, ServiceRulePayload } from "../types/servicesrules";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    serviceRuleSchema,
    ServiceRuleFormData
} from "@/app/schemas/servicerules";


type Props = {
    serviceRule?: ServiceRule;
    onSubmit: (data: ServiceRulePayload) => void;
};


export function ServiceRuleForm({
    serviceRule,
    onSubmit
}: Props) {


    const submitForm = (
        data: ServiceRuleFormData
    ) => {

        onSubmit({
            name: data.name,
            description: data.description,
            interval_km: data.interval_km ?? null,
            interval_days: data.interval_days ?? null,
            interval_months: data.interval_months ?? null,
            inspection_type: data.inspection_type || null,
            is_active: data.is_active
        });

    };


    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ServiceRuleFormData>({
        resolver: zodResolver(serviceRuleSchema),

        defaultValues: {
            name: serviceRule?.name || "",
            description: serviceRule?.description || "",
            interval_km: serviceRule?.interval_km ?? undefined,
            interval_days: serviceRule?.interval_days ?? undefined,
            interval_months: serviceRule?.interval_months ?? undefined,
            inspection_type: serviceRule?.inspection_type || "",
            is_active: serviceRule?.is_active ?? true
        }
    });


    return (
        <form onSubmit={handleSubmit(submitForm)}>


            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                    Nome da Regra
                </label>

                <input
                    type="text"
                    {...register("name")}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white px-3 py-2"
                    placeholder="Ex: Troca de óleo"
                />

                {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.name.message}
                    </p>
                )}
            </div>



            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                    Descrição
                </label>

                <input
                    type="text"
                    {...register("description")}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white px-3 py-2"
                    placeholder="Ex: Realizar troca preventiva do óleo"
                />

                {errors.description && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.description.message}
                    </p>
                )}
            </div>



            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                    Intervalo em KM
                </label>

                <input
                    type="number"
                    {...register("interval_km", {
                        valueAsNumber: true
                    })}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white px-3 py-2"
                    placeholder="Ex: 10000"
                />

                {errors.interval_km && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.interval_km.message}
                    </p>
                )}
            </div>



            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                    Intervalo em Dias
                </label>

                <input
                    type="number"
                    {...register("interval_days", {
                        valueAsNumber: true
                    })}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white px-3 py-2"
                    placeholder="Ex: 180"
                />

                {errors.interval_days && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.interval_days.message}
                    </p>
                )}
            </div>



            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                    Intervalo em Meses
                </label>

                <input
                    type="number"
                    {...register("interval_months", {
                        valueAsNumber: true
                    })}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white px-3 py-2"
                    placeholder="Ex: 12"
                />

                {errors.interval_months && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.interval_months.message}
                    </p>
                )}
            </div>



            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                    Tipo
                </label>

                <input
                    type="text"
                    {...register("inspection_type")}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white px-3 py-2"
                    placeholder="Ex: Manutenção"
                />

                {errors.inspection_type && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.inspection_type.message}
                    </p>
                )}
            </div>



            <div className="mb-4 flex items-center gap-2">
                <input
                    type="checkbox"
                    {...register("is_active")}
                />

                <label className="text-sm font-bold">
                    Regra ativa
                </label>
            </div>



            <button
                type="submit"
                className="w-full mt-6 px-4 py-2 rounded-lg bg-zinc-100 text-black hover:bg-zinc-300 transition"
            >
                Salvar Regra
            </button>

        </form>
    )
}