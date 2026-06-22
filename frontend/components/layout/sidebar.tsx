import Link from "next/link";

export function Sidebar() {
    return (
        <aside
            className="
                w-64
                min-h-screen
                bg-black
                border-r
                p-4
            "
        >
            <h1
                className="
                    text-xl
                    font-bold
                    mb-8
                "
            >
                Fleet Manager
            </h1>

            <nav
                className="
                    flex
                    flex-col
                    gap-3
                "
            >
                <Link href="/">
                    Dashboard
                </Link>

                <Link href="/vehicles">
                    Veículos
                </Link>

                <Link href="/maintenances">
                    Manutenções
                </Link>

                <Link href="/inspections">
                    Inspeções
                </Link>

                <Link href="/service-rules">
                    Regras
                </Link>
            </nav>
        </aside>
    );
}