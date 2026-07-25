type SummaryCardProps = {
    title: string
    value: number
}

export function SummaryCard({
    title,
    value
}: SummaryCardProps) {
    return (
        <div
            className="
                rounded-lg
                border
                p-6
                shadow-sm
            "
        >
            <h2 className="text-sm text-gray-500">
                {title}
            </h2>

            <p className="text-3xl font-bold">
                {value}
            </p>
        </div>
    )
}

