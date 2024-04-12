"use client"

import { useState, useEffect } from 'react';
import Code from "./Code"
import getUserProfile from '@/libs/getUserProfile';
import { useSession } from 'next-auth/react';


interface Coupon {
    couponName: string;
    couponCode: string;
    // add other properties as needed
}
interface UserData {
    coupons: Coupon[];
    // add other properties as needed
}

interface User {
    data: UserData;
    // add other properties as needed
}

export default function CodeCatalog(){
    const [user, setUser] = useState<User|null>(null);
    const {data: session} = useSession();
    const token = session?.user?.token as string;

    useEffect(() => {
        getUserProfile(token).then(userData => {
            setUser(userData);
        });
    }, []);

    return(
        <div className=" flex flex-col space-y-5 p-[50px]">
            {user?.data.coupons.map((coupon) => (
                <Code couponName={coupon.couponName} couponCode={coupon.couponCode}/>       
            ))}
        </div>
    )
}