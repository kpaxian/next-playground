import Card from "@/app/components/card";
import Link from "next/link";

export default function ArchivedNotifications() {
    return(
        <Card>
            <p>Archived Notifications</p>
            <br />
            <Link href="/complex-dashboard">Default</Link>
        </Card>
    );
}