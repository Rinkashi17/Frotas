import { getDashboardSummary, getTopCostVehicles } from "@/services/api";

import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { TopVehiclesTable } from "@/components/dashboard/TopVehiclesTable";


export default async function Home() {

    const summary =
    await getDashboardSummary();

    const topVehicles =
    await getTopCostVehicles();

    return (
        <main
            className="
                grid
                grid-cols-3
                gap-4
                p-8
            "
        >

            <SummaryCard
                title="Veículos"
                value={summary.total_vehicles}
            />

            <SummaryCard
                title="Ativos"
                value={summary.active_vehicles}
            />

            <SummaryCard
                title="Manutenções"
                value={summary.total_maintenances}
            />

            <div
                className="
                    col-span-3
                    mt-8
                "
            >
                <TopVehiclesTable
                    vehicles={topVehicles}
                />
            </div>

        </main>
    );
}