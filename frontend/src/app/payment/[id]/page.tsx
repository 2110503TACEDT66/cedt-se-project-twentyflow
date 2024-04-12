import PaymentCard from "@/components/PaymentCard";
import getReservation from "@/libs/getReservation";
import { useSession } from "next-auth/react";


export default async function Page({params} : {params : {id : string}}){
    return(
        <PaymentCard reservationId={params.id}/> // Use reservationDetail
    )
}