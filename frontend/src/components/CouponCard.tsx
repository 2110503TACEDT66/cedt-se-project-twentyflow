import Image from 'next/image'
import InteractiveCard from './InteractiveCard';
import getUserProfile from '@/libs/getUserProfile';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import createCoupon from '@/libs/createCoupon';
import createReward from '@/libs/createReward';
import Swal from 'sweetalert2'


interface UserData {
    points: number;
    // add other properties as needed
}

interface User {
    data: UserData;
    // add other properties as needed
}

export default function CouponCard( { couponName,couponPoint, couponAmount }
    : { couponName:string, couponPoint:number , couponAmount:number}) {

    const { data: session } = useSession();    
    const token = session?.user?.token as string;    
    const [user, setUser] = useState<User|null>(null);
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


    // This effect runs once when the component mounts
    useEffect(() => {
        if (token) {
            getUserProfile(token).then(userData => setUser(userData));
        }
    }, []);

    const onRedeem = async (couponName:string,couponPoint:number, couponAmount : number) => {
        if(user !== null) {
            let userPoints = user.data.points;
        let newPoints;
        if(userPoints >= couponPoint){
            
            const res = await createCoupon(token, couponName, couponAmount);
            if (!res) {
                alert('Failed to redeem coupon');
                return;
            }
            newPoints = userPoints - couponPoint;
        } else {
            alert(`You do not have enough points to redeem ${couponName}`);
            return;
        }

        //Update the points
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

        const reward = await createReward(token, couponName,-1 * couponPoint);
        if (!reward) {
            alert('Failed to add reward');
            return;
        }
        Swal.fire({
            title: "Success!",
            text: `You have successfully redeemed ${couponName}!`,
            icon: "success"
          });
        
          window.location.reload();
    }
        
    }
    
    return (
        <InteractiveCard contentName={couponName}>
            <div className='w-full h-[55%] relative rounded-t-lg'>
                <Image src={ '/img/coupon.png'}
                alt='Coupon Picture'
                fill={true}
                className='object-cover rounded-t-lg'/>
            </div>
            <div className='w-full mt-3 flex ml-4  font-bold'>{couponName}</div>
            <div className='flex mt-5 flex-row '>
                <div className='w-1/5 relative' >
                    <Image src={ '/img/giftIcon.png'}
                    alt='GiftIcon Picture'
                    fill={true}
                    className='object-contain'/>
                </div>
                <h5 className='inline font-bold text-custom-purple mx-[10px] mt-1'>{couponPoint}</h5>
            </div>
            <div className='flex justify-center items-center h-[20%]'>
                <button className='w-full text-sm rounded-md bg-custom-purple
                hover:bg-violet-800 mx-2 px-1 py-1 text-white shadow-sm font-bold'
                onClick={ (e) => {e.stopPropagation(); e.preventDefault(); onRedeem(couponName,couponPoint, couponAmount); }}
                >Redeem</button>
            </div>
        </InteractiveCard>
    );
}