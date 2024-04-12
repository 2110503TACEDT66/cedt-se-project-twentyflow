"use client"

import { useState, useEffect } from 'react';
import Code from "./Code"
import getUserProfile from '@/libs/getUserProfile';
import { useSession } from 'next-auth/react';
import Image from 'next/image';


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
    const [user, setUser] = useState<User>({ data: { coupons: [] } });
    const {data: session} = useSession();
    const token = session?.user?.token as string;

    useEffect(() => {
        getUserProfile(token).then(userData => {
            setUser(userData);
        });
    }, []);

    return(
        <div className=" flex flex-col space-y-5 p-[50px]">
            {user?.data?.coupons?.length > 0 ? (
            user?.data.coupons.map((coupon) => (
                <Code key={coupon.couponCode} couponName={coupon.couponName} couponCode={coupon.couponCode}/>
            ))
        ) : (
            <div className='w-full h-[200px] rounded-lg shadow-xl bg-gray-400 flex flex-row'>
                <div className='w-[130px] h-[130px] relative bg-gray-200 m-[30px] rounded-lg'>
                <Image src={ '/img/couponIcon.png'}
                    alt='couponIcon Picture'
                    fill={true}
                    className='object-contain rounded-t-lg p-[30px]'/>
                </div>
                <h1 className='text-3xl font-bold text-gray-700 pt-10'>No Coupons</h1>
            </div>
        )}
        </div>
    )
}