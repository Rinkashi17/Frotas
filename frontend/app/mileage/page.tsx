import { MileageList } from "@/components/mileage/MileageList";
import { getMileage } from "@/services/mileage";

export default async function MileagePage() {

    const vehicle_id = 1;

    const mileage = await getMileage(vehicle_id);

    return (
        <MileageList
            vehicle_id={1}
            initialMileage={mileage}
        />
    )
}