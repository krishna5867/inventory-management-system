import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LayoutClient from "./LayoutClient";

export default async function ProtectedLayout({ children }) {
  // const session = await getServerSession();

  // if (!session) {
  //   redirect('/signin');
  //   return null; 
  // }

  return <LayoutClient >{children}</LayoutClient>;  // session={session}
}
