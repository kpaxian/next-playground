
type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
}

export default async function UsersPage() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await fetch("https://jsonplaceholder.typicode.com/usersx");
    const users = await response.json();

    console.log('users', users);

    return (
        <div className="grid grid-cols-2 gap-2j p-4">
            <h1>Users page</h1>
            {users.map((item: User) => {
                return (
                    <div
                        key={item.id}
                        className="flex items-center justify-between p-4 shadow"
                    >
                        <h2>{item.username}</h2>
                    </div>
                )
            })}
        </div>
    )
}