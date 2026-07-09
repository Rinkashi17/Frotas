import { MaintenancesList } from "@/components/maintenances/MaintenancesList";
import { getMaintenances } from "@/services/maintenances";

export default async function MaintenancesPage() {

    const vehicle_id = 1;

    const maintenances = await getMaintenances(vehicle_id);

    return (
        <MaintenancesList
            vehicle_id={1}
            initialMaintenances={maintenances}
        />
    )
}