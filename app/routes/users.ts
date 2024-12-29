import { json } from "@remix-run/node";
import { prisma } from "~/utils/db.server";

export async function loader() {
  const users = await prisma.user.findMany();
  return json(users);
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");

  const user = await prisma.user.create({
    data: { name: String(name), email: String(email) },
  });

  return json(user);
}
