import { TopCostVehicle } from "@/types/dashboard";

type Props = {
    vehicles: TopCostVehicle[];
}

export function TopVehiclesTable({
    vehicles
}: Props) {

    return (
        <div className="bg-black rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
                Veículos com maior custo
            </h2>
            <table className="w-full">
                <thead>
                    <tr className="border-b text-left">
                        <th className="pb-3">Placa</th>
                        <th className="pb-3">Veículo</th>
                        <th className="pb-3">Custo</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicles.map(vehicle => (
                        <tr
                            key={vehicle.plate}
                            className="border-b hover:bg-gray-50 transition"
                        >
                            <td className="py-3">
                                {vehicle.plate}
                            </td>
                            <td className="py-3">
                                {vehicle.brand} {vehicle.model}
                            </td>
                            <td className=" py-3 font-semibold">
                                R$ {vehicle.total_cost.toFixed(2)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        )
}