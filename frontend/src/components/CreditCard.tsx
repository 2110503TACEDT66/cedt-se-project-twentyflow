'use client';

import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";

export default function CreditCard() {

    const session = useSession();
    const currentUser = session.data?.user;
    
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvc, setCvc] = useState('');
    const [cardNumberFetch, setCardNumberFetch] = useState();

    const saveCreditCard = async () => {
        if (currentUser && cvc && cardNumber && expiryDate) {

            fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/user/${currentUser._id}`, 
                {
                  method: 'PUT',
                  headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${currentUser.token}`,
                  },
                  body: JSON.stringify({
                    token: "tok_visa"
                  }),
                }
            )
            

            Swal.fire({
                title: "Card Saved",
                icon: "success"
            });
        }
        else {
            Swal.fire({
                title: "Invalid Input",
                icon: "error" 
            });
        }
    }

    useEffect(() => {
        if (currentUser) {
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
                        setCardNumberFetch(data.data.last4);
                    }
                    catch (error){
                        setCardNumberFetch(undefined);
                    }
                }
            );
        }
    }, []);

    return(
        <div className=" w-full flex flex-col space-y-4">
            {
                (cardNumberFetch === undefined
                    ? ""
                    :
                      <h1 className=" font-semibold text-xl border-2 py-4 px-5 rounded-md border-gray-300">
                       <FontAwesomeIcon icon={faCreditCard}/> Your credit card : {"•••• •••• •••• " + cardNumberFetch}
                      </h1>)
            }
            <div>
                <h1 className=" font-bold text-xl">
                    Card Number
                </h1>
                <input value={cardNumber} onChange={(e)=>{setCardNumber(e.target.value)}} id="cardNumber" type="number" placeholder="0000 0000 0000 0000" className=" w-full font-semibold text-xl border-2 p-3 rounded-md border-gray-300" ></input>
            </div>

            <div className=" flex flex-row w-full space-x-4">
                <div className=" w-1/2">
                    <h1 className=" font-bold text-xl">
                        Expiry Date
                    </h1>
                    <input value={expiryDate} onChange={(e)=>{setExpiryDate(e.target.value)}} id="date"  placeholder="MM/YY" className=" w-full font-semibold text-xl border-2 p-3 rounded-md border-gray-300" ></input>
                </div>
                <div className=" w-1/2">
                    <h1 className=" font-bold text-xl">
                        CVC
                    </h1>
                    <input value={cvc} onChange={(e)=>{setCvc(e.target.value)}} id="cvc" placeholder="•••" type="number" className=" w-full font-semibold text-xl border-2 p-3 rounded-md border-gray-300" ></input>
                </div>
            </div>
            <button className= "bg-main-100 text-white text-[20px] py-3 rounded-md font-semibold w-full" onClick={saveCreditCard}>
                SAVE
            </button>
        </div>
    )
}