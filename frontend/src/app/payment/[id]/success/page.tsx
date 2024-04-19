"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useEffect , useRef,  } from "react";
import { useSession } from "next-auth/react";
<<<<<<< HEAD
import Link from "next/link";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import sleep from "sleep-promise";


=======
import Swal from "sweetalert2";
>>>>>>> 5ac3d57fd44db89f8b1c01135c504a38ae491a0f

export default function Success() {
  const { data: session, status } = useSession();
  const initialized = useRef(false)
  const[isLoading, setIsLoaded] = useState(false)

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
<<<<<<< HEAD
          })
        })
        .then((res) => {
          sleep(2000)
          setIsLoaded(true)
=======
          }),
>>>>>>> 5ac3d57fd44db89f8b1c01135c504a38ae491a0f
        })
        Swal.fire({
          title: "Payment Success",
          icon: "success" 
      }).then((result)=>{
        if (result.isConfirmed) {
          window.location.href='/'
        }
      });
    }}
    console.log("")
  }, []);

  return (
<<<<<<< HEAD
    <main className=" flex justify-center items-center">
      {isLoading ? 
      (
        <div className=" flex h-96 justify-center items-center ">
          <CircularProgress />
        </div>
      )
    : (<div className=" mt-20 w-1/2 bg-white flex space-y-10 flex-col items-center p-10">
        <FontAwesomeIcon icon={faCircleCheck} size="xl" className=" w-40 h-40 text-green-500" />
        <h1 className=" text-5xl font-semibold">
            Success!
        </h1>
        <h1 className=" text-2xl font-semibold">
            Your payment has been successfully processed.
        </h1>
        <button>
            <Link href="/" className=" text-white text-xl bg-main-100 p-3 font-semibold rounded-full">
                Go back to home
            </Link>
        </button>
      </div>)}
=======
    <main>
>>>>>>> 5ac3d57fd44db89f8b1c01135c504a38ae491a0f
    </main>
  );
}