"use client";

import { useSession } from "next-auth/react";
import Top from "../components/top-part/top";
import Card from "../components/card/card";
import { FadeLoader } from "react-spinners";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: sessionData, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <FadeLoader color="#26A4FF" cssOverride={{ margin: "13% auto" }} />
    );
  }

  if (status === "unauthenticated" || !sessionData) {
    router.push("/login");
    return null; // Prevents rendering until the redirect happens
  }

  return (
    <main>
      <Top />
      <Card />
    </main>
  );
}

