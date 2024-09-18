import { getServerSession } from "next-auth";

export default async function Dashboardpage() {
  const session = await getServerSession();

  return (
    <div>
      <h1>Dashboard Page</h1>
      <p>Welcome, {session.user.email}!</p>
    </div>
  );
}

