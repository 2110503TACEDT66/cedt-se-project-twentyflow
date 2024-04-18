"use client";
import getCustomerCard from "@/libs/getCustomerCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentCard({
  reservationId,
}: {
  reservationId: string;
}) {
  const router = useRouter();
  const session = useSession();
  const currentUser = session.data?.user;
  const [currentReservation, setCurrentReservation] = useState<Reservation>();
  const [cardNumber, setCardNumber] = useState<string | undefined>();

  // console.log(reservationId)
  //console.log(currentReservation?.coWorking.price_hourly);

  useEffect(() => {
    if (currentUser) {
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/appointments/${reservationId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${currentUser.token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setCurrentReservation(data.data);
        });

      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/user/${currentUser._id}`, 
        {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${currentUser.token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setCardNumber(data.name);
          // setExp(data.)
        }
      );
    }
  }, []);

  const hour: number = currentReservation
    ? Math.ceil(
        (new Date(currentReservation.endTime).getTime() -
          new Date(currentReservation?.startTime).getTime()) /
          (1000 * 60 * 60)
      )
    : 0;
  const coWorkingName = currentReservation?.coWorking.name;
  const userName = currentUser?.name;

  const onsubmit = async () => {
    //navigate to sripe payment
    try {
      const linkRes = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId: currentReservation?._id,
          token: currentUser?.token,
        }),
      });
      const res = await linkRes.json();
      console.log(res.sessionUrl);
      if (res.sessionUrl){  
        window.location.href = res.sessionUrl;
      }
        
      else{
         alert("This session is finished");
        }
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };
  return (
    <div className="flex w-screen flex-col  items-center bg-main-100 min-h-[90vh] p-7">
      <h1 className=" text-5xl py-10 font-semibold text-white">PAYMENT</h1>

      <div className=" w-10/12 space-y-10 h-full p-10 bg-white rounded-md flex flex-col">
        <div className=" flex flex-col space-y-3">
          <h1 className=" font-bold text-xl">Name</h1>
          <h1 className=" font-semibold text-xl border-2 p-3 rounded-md border-gray-300">
            {coWorkingName}
          </h1>
        </div>

        <div className="flex flex-row w-full space-x-7">
          <div className=" flex flex-col w-1/5 space-y-3">
            <h1 className=" font-bold text-xl">Time</h1>
            <div className=" flex flex-row w-full space-x-5">
              <h1 className=" font-semibold text-xl border-2 py-4 px-5 rounded-md border-gray-300">
                {hour}
              </h1>
              <h1 className=" font-semibold text-xl flex flex-col justify-center">
                Hour
              </h1>
            </div>
          </div>

          <div className=" flex flex-col w-1/4 space-y-3">
            <h1 className=" font-bold text-xl">Price</h1>
            <div className=" flex flex-row w-full space-x-5">
              <h1 className=" font-semibold text-xl border-2 py-4 px-5 rounded-md border-gray-300">
                {currentReservation !== undefined
                  ? currentReservation.coWorking.price_hourly * hour
                  : "NaN"}
              </h1>
              <h1 className=" font-semibold text-xl flex flex-col justify-center">
                Baht
              </h1>
            </div>
          </div>

          <div className=" flex flex-col w-1/5 space-y-3">
            <h1 className=" font-bold text-xl">User</h1>
            <div className=" flex flex-row w-full space-x-7">
              <h1 className=" font-semibold text-xl border-2 py-4 px-5 rounded-md border-gray-300">
                {userName}
              </h1>
            </div>
          </div>
          
          <div className=" flex flex-col w-full space-y-3">
            <h1 className=" font-bold text-xl">Credit Card</h1>
            <div className=" flex flex-row w-full space-x-7">
              {
                cardNumber === undefined
                ? 
                  <div className="flex flex-row w-full space-x-2">
                    <h1 className=" font-semibold text-xl border-2 py-4 px-5 rounded-md border-gray-300">
                      You have never added the card.
                    </h1>
                    <button className="text-white bg-main-100 font-semibold text-xl border-2 py-4 px-5 rounded-md border-gray-300
                    hover:text-main-100 hover:bg-white"
                    onClick={(e) => router.push('/account')}> Add Card Here </button>
                  </div>
                :
                  <h1 className=" font-semibold text-xl border-2 py-4 px-5 rounded-md border-gray-300">
                    {cardNumber}
                  </h1>
              }
            </div>
          </div>

        </div>

        <div className="">
          <p className="m-0">
            ***The total cost is calculated by multiplying the hourly rate by
            the number of hours.
          </p>
          <button
            className="bg-main-100 text-white text-[20px] py-3 rounded-md font-semibold w-full"
            onClick={onsubmit}
          >
            Confirm Your Payment
          </button>
        </div>
      </div>
    </div>
  );
}