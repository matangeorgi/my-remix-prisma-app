import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/utils/db.server";

export async function loader() {
  const users = await prisma.user.findMany();
  return json(users);
}

export default function Index() {
  const users = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}
