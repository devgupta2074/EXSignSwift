import Image from "next/image";
import Step2 from "@/components/Step2";
import { getServerSession, Session } from "next-auth";

import { redirect, useRouter } from "next/navigation";
import { handler } from "./api/auth/[...nextauth]/route";
import { config } from "@/lib/auth";

// import { useSession } from "next-auth/react";
import axios from "axios";
export default async function Home() {
  const session: Session | null = await getServerSession(config);

  console.log("dev", session);
  // const router = useRouter();
  if (!session) {
    redirect("/login");
  } else {
    const response = await axios.post(
      "http://localhost:3000/api/users/registerUser",
      session.user
    );
    console.log(response.data.user.customerId);
    redirect(`/user/${response.data.user.customerId}`);
  }

  return <></>;
}
