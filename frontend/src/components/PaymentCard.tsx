"use client";
import getCustomerCard from "@/libs/getCustomerCard";
import { CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function PaymentCard({
  reservationId,
}: {
  reservationId: string;
}) {
  const router = useRouter();
  const session = useSession();
  const currentUser = session.data?.user;
  const [currentReservation, setCurrentReservation] = useState<Reservation>();
  const [cardNumber, setCardNumber] = useState<number>();
  const[isLoading, setIsLoading] = useState<boolean>(true);


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
          try{
            setCardNumber(data.data.last4);
            setIsLoading(false);
          }
          catch (error){
            setCardNumber(undefined);
            setIsLoading(false);
          }
        }
      );
    }
  }, []);
  
 

 
  let hourC = 0
  const startHour = parseInt(currentReservation?.startTime?.split(":")[0] ?? "")
  const endHour = parseInt(currentReservation?.endTime?.split(":")[0] ?? "")
  const startMin = parseInt(currentReservation?.startTime?.split(":")[1] ?? "")
  const endMin = parseInt(currentReservation?.endTime?.split(":")[1] ?? "")
 

    if(startMin < endMin){
        hourC += 1
    }
    hourC += endHour - startHour
  const hour: number = hourC;
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
        //  alert("This session is finished");
        Swal.fire({
          title: "Cannot process the payment",
          icon: "error" 
      });
        }
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };
  const appt = currentReservation?.date ? new Date(currentReservation.date) : null;
  return (
    <div className="flex min-w-screen flex-col  items-center bg-main-100 min-h-[90vh] p-7">
      <h1 className=" text-5xl py-10 font-semibold text-white">PAYMENT</h1>

      <div className=" w-10/12 space-y-10 h-full p-10 bg-white rounded-md flex flex-col">
        <div className=" flex flex-row  w-full space-x-5">
          <div className="flex flex-col space-y-3 w-5/6" >
            <h1 className=" font-bold text-xl">Name</h1>
            <h1 className=" font-semibold text-xl border-2 p-3 rounded-md border-gray-300">
              {currentReservation?.coWorking.name}
            </h1>
          </div>
          <div className="flex flex-col space-y-3 w-1/6 " >
            <h1 className=" font-bold text-xl">Room</h1>
            <h1 className=" font-semibold text-xl border-2 p-3 rounded-md border-gray-300">
              {currentReservation?.room.roomNumber}
            </h1>
          </div>
        </div>

        <div className=" flex flex-col w-full space-y-3">
          <h1 className=" font-bold text-xl">Date</h1>
          <div className=" flex flex-row space-y-3 w-full">
            <h1 className=" font-semibold text-xl w-full border-2 p-3 rounded-md border-gray-300">
              {appt?.toLocaleDateString('th-TH')}
            </h1>
          </div>
        </div>

        <div className=" flex flex-row w-full space-x-5">
          <div className=" flex flex-col w-1/2 space-y-3">
            <h1 className=" font-bold text-xl">
              Start Time
            </h1>
            <div className=" flex flex-row space-y-3 w-full">
              <h1 className=" font-semibold text-xl w-full border-2 p-3 rounded-md border-gray-300">
                {currentReservation?.startTime}
              </h1>
            </div>
          </div>
          <div className=" flex flex-col w-1/2 space-y-3">
            <h1 className=" font-bold text-xl">
                End Time
            </h1>
            <div className=" flex flex-row space-y-3 w-full">
              <h1 className=" font-semibold text-xl w-full border-2 p-3 rounded-md border-gray-300">
                {currentReservation?.endTime}
              </h1>
            </div>
          </div>

        </div>
        
        

        <div className=" flex flex-col w-full space-y-3">
          <h1 className=" font-bold text-xl">Additional requirement</h1>
          <div className=" flex flex-row space-y-3 w-full">
            <h1 className=" font-semibold min-h-40 w-full text-xl border-2 p-3 rounded-md border-gray-300">
              {currentReservation?.additional}
            </h1>
          </div>
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
                  : ""}
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
                {userName?.split(" ")[0]}
              </h1>
            </div>
          </div>
          
          <div className=" flex flex-col w-full space-y-3">
            <h1 className=" font-bold text-xl">Credit Card (Last4)</h1>
            <div className=" flex flex-row w-full space-x-7">
              {
                isLoading ?
                  <CircularProgress /> :
                (cardNumber === undefined
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
                      {"•••• •••• •••• " + cardNumber}
                    </h1>)
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