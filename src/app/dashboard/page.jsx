import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation';

export default async function Dashboardpage() {
  const session = await getServerSession();

  if (!session) {
    redirect('/signin');
  }

  return (
    <div>
      <h1>Dashboard Page</h1>
      <p>Welcome, {session.user.email}!</p>
    </div>
  );
}

