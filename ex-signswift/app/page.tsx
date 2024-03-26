import Image from "next/image";
import Step2 from "@/components/Step2";
import { getServerSession, Session } from "next-auth";

import { redirect, useRouter } from "next/navigation";
import { handler } from "./api/auth/[...nextauth]/route";
import { config } from "@/lib/auth";

// import { useSession } from "next-auth/react";
export default async function Home() {
  const session: Session | null = await getServerSession(config);

  console.log("dev", session);
  // const router = useRouter();
  if (!session) {
    redirect("/login");
  } else {
    redirect(`/user/${session.user.id}`);
  }

  return <></>;
}
