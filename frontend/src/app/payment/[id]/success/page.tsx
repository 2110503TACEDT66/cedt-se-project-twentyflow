"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Success() {
  const { data: session, status } = useSession();

  let url = "";
  if (typeof window !== "undefined") {
    url = window.location.href;
  }

  useEffect(() => {
    if (url) {
      let appId = url.split("/")[4];
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/appointments/${appId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.user.token}`,
        },
        body: JSON.stringify({
          status: "finished",
        }),
      })
        .then((response) => {
          if (response.ok) {
            console.log("Appointment status updated successfully.");
          } else {
            console.error(
              "Failed to update appointment status:",
              response.statusText
            );
          }
        })
        .catch((error) => {
          console.error(
            "Error occurred while updating appointment status:",
            error
          );
        });
    }
  }, [url]);

  return (
    <main>
      <h1 className="text-center m-3 font-semibold">Success Payment</h1>
    </main>
  );
}
