"use client"

import { ServiceRule } from "../types/servicesrules";

import { ServiceRuleForm } from "./ServiceRuleForm";

type Props = {
    open: boolean;
    serviceRule: ServiceRule | undefined;
    onClose: () => void;
    onSubmit: (data: Omit<ServiceRule, "id">) => void;
};

export function ServiceRuleModal({
    open,
    serviceRule,
    onClose,
    onSubmit
}: Props) {
    if (!open) return null;
    return (
        <div>
            {open && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-6">
                            {serviceRule ? "Editar Regra" : "Adicionar Regra"}
                        </h2>
                        <ServiceRuleForm
                            serviceRule={serviceRule}
                            onSubmit={onSubmit}
                        />
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition">
                            Fechar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}