import { InspectionsList } from "@/components/inspections/InspectionsList";
import { getInspections } from "@/services/inspections";

export default async function InspectionPage() {

    const vehicle_id = 1;

    const inspection = await getInspections(vehicle_id);

    return (
        <InspectionsList
            vehicle_id={1}
            initialInspection={inspection}
        />
    )
}