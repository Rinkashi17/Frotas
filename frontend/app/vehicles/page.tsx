import { VehicleList } from "@/components/vehicles/VehiclesList";
import { getVehicles } from "@/services/api";

export default async function VehiclesPage() {

    const vehicles = await getVehicles();

    return (
        <VehicleList
            initialVehicles={vehicles}
        />
    )
}