type Props = {
    total: number
}

export function UpcomingInspectionsCard({
    total
}: Props) {
    return (
        <div className="rounded-lg border p-4">
            <h2>Vistorias Pendentes</h2>

            <p className="text-3xl font-bold">
                {total}
            </p>
        </div>
    )
}