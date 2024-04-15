"use client";

import { useEffect , useRef } from "react";
import { useSession } from "next-auth/react";

export default function Success() {
  const { data: session, status } = useSession();
  const initialized = useRef(false)

  let url = "";
  if (typeof window !== "undefined") {
    url = window.location.href;
  }

  useEffect(() => {
      if (!initialized.current) {
        initialized.current = true
        if (url) {
        let appId = (url.split("/")[4]).split("&")[0];
        let amount = (url.split("/")[4]).split("&")[1];
        fetch (`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/updateall`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${session?.user.token}`,
          },
          body: JSON.stringify({
            appointmentID : appId,
            amount : amount
          }),
      
          
        })
    }}
    console.log("")
  }, []);

  return (
    <main>
      <h1 className="text-center m-3 font-semibold">Success Payment</h1>
    </main>
  );
}
