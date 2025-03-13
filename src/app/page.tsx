import { Button } from "@/components/ui/button";
import { fetchUsers } from "@/actions/fetchUsers";

export default async function Home() {
  const users = await fetchUsers();

  return (
    <div className="flex justify-center gap-4">
      {users.map((user) => {
        return <Button key={user.id}>{user.name}</Button>;
      })}
    </div>
  );
}
