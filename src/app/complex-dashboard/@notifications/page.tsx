import Card from "@/app/components/card";
import Link from "next/link";

export default function Notifications() {
    return (
        <Card>
            <p>Notififications</p>
            <Link href="/complex-dashboard/archived">Archived</Link>
        </Card>
    );
}
