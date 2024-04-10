import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

export default async function getReservations(){

    const session = await getServerSession(authOptions);
    if(session){
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/appointments`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization":`Bearer ${session.user?.token}`
            },
        })
        if(!response.ok) {
            throw new Error("Failed to fetch reservation")
        }
        return await response.json()

        
        
    }
    else{
        redirect("/api/auth/signin")
    }
        
}