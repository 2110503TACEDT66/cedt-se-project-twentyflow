import Image from 'next/image'
import InteractiveCard from './InteractiveCard';
import getUserProfile from '@/libs/getUserProfile';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

interface UserData {
    points: number;
    // add other properties as needed
}

interface User {
    data: UserData;
    // add other properties as needed
}

export default function CouponCard( { couponName,couponPoint }
    : { couponName:string, couponPoint:number}) {

    const { data: session } = useSession();    
    const token = session?.user?.token as string;    
    const [user, setUser] = useState<User|null>(null);

    // This effect runs once when the component mounts
    useEffect(() => {
        if (token) {
            getUserProfile(token).then(userData => setUser(userData));
        }
    }, []);

    const onRedeem = async (couponName:string) => {
        if(user !== null) {
            let userPoints = user.data.points;
        let newPoints;
        if(userPoints >= 1000 && couponName == 'Coupon Discount 10 THB') {
            alert(`You have redeemed ${couponName}`);
            newPoints = userPoints - 1000;
        } else if(userPoints >= 2000 && couponName == 'Coupon Discount 20 THB') {
            alert(`You have redeemed ${couponName}`);
            newPoints = userPoints - 2000;
        } else if(userPoints >= 5000 && couponName == 'Coupon Discount 50 THB') {
            alert(`You have redeemed ${couponName}`);
            newPoints = userPoints - 5000;
        } else if(userPoints >= 10000 && couponName == 'Coupon Discount 100 THB') {
            alert(`You have redeemed ${couponName}`);
            newPoints = userPoints - 10000;
        } else {
            alert(`You do not have enough points to redeem ${couponName}`);
            return;
        }

        // Update the points
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/updatepoints`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "authorization":`Bearer ${session?.user.token}`
            },
            body: JSON.stringify({
                points: newPoints,
            }),
        });

        if (!response.ok) {
            // Handle error
            console.error('Failed to update points');
            return;
        }

        window.location.reload();
    }
        
    }
    
    return (
        <InteractiveCard contentName={couponName}>
            <div className='w-full h-[60%] relative rounded-t-lg'>
                <Image src={ '/img/coupon.png'}
                alt='Coupon Picture'
                fill={true}
                className='object-cover rounded-t-lg'/>
            </div>
            <div className='w-full h-[10%]  flex justify-center items-center'>{couponName}</div>
            <div className='h-[10%]  flex justify-center inline '>{couponPoint}</div>
            <div className='flex justify-center items-center h-[20%]'>
                <button className='w-full text-sm rounded-md bg-purple-600
                hover:bg-sky-600 mx-2 px-1 py-1 text-white shadow-sm'
                onClick={ (e) => {e.stopPropagation(); e.preventDefault(); onRedeem(couponName); }}
                >Redeem</button>
            </div>
        </InteractiveCard>
    );
}