import Image from "next/image";

import EmailTemp from "../components/emailForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <EmailTemp />
    </main>
  );
}
