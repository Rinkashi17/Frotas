"use client"

import { Inspection } from "../types/inspectionsApi";
import { InspectionsForm } from "./InspectionsForm";

type Props = {
    open: boolean;
    vehicle_id: number;
    inspection: Inspection | undefined;
    onClose: () => void;
    onSubmit: (data: Omit<Inspection, "id">) => void;
};

export function InspectionModal({
    open,
    inspection,
    vehicle_id,
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
                            {inspection ? "Editar Inspeção" : "Adicionar Inspeção"}
                        </h2>
                        <InspectionsForm
                            vehicle_id={vehicle_id}
                            inspection={inspection}
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